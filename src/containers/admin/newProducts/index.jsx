import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Container, Form, Input, InputGrup, Label, LabelUpload, Select, SubmitButton, ErrorMessage, CheckboxContainer } from "./styled"
import { ImageIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const schema = yup
  .object({
    name: yup.string().required('Digite o nome do produto'),
    price: yup.number().positive().required('Digite o preço do produto').typeError('Digite o preço do produto'),
    category: yup.object().required('Escolha a categoria do produto').typeError('Escolha a categoria do produto'),
    file: yup.mixed()
      .test('required', 'Faça o upload da imagem do produto', (value) => {
        return value && value.length > 0;
      }).test('fileSize', 'O arquivo é muito grande. Tamanho máximo é 5MB', (value) => {
        return value && value[0] && value[0].size <= 5000000; // 5MB
      }).test('fileType', 'Formato de arquivo não suportado. Apenas PNG e JPEG são aceitos', (value) => {
        return value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type);
      }),
  })


export function NewProduts() {
  const navigation = useNavigate();
  const [fileName, setFileName] = useState(null);
  const [categoies, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      setCategories(data);
    }
    loadCategories();
  }, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {
    const productFormData = new FormData();
    productFormData.append('name', data.name);
    productFormData.append('price', data.price);
    productFormData.append('category_id', data.category.value);
    productFormData.append('file', data.file[0]);
    productFormData.append("offer", Boolean(data.offer));

    await toast.promise(api.post('/products', productFormData), {
      pending: 'Adicionando produto...',
      success: 'Produto adicionado com sucesso!',
      error: 'Erro ao adicionar o produto.'
    });
    setTimeout(() => {
      navigation("/admin/produtos");
    }, 2000);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGrup>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputGrup>


        <InputGrup>
          <Label>Preço</Label>
          <Input type="number" {...register('price')} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </InputGrup>


        <InputGrup>
          <LabelUpload>
            <ImageIcon />
            <input type="file" {...register('file')}
              accept="image/png, image/jpeg"
              onChange={(value) => {
                setFileName(value.target.files[0]?.name);
                register('file').onChange(value);

              }}
            />
            {fileName ? fileName : 'Upload do produto'}
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </InputGrup>

        <InputGrup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                menuPortalTarget={document.body}
                placeholder="Selecione a categoria"
                options={categoies.map((category) => ({
                  value: category.id,
                  label: category.name,
                })
                )}
              />
            )}
          />
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </InputGrup>

        <InputGrup>
                  <CheckboxContainer>
                    <input type="checkbox" {...register("offer")} />
                    <Label>Produto em oferta?</Label>
                  </CheckboxContainer>
                </InputGrup>
        <SubmitButton>Adicionar produto</SubmitButton>
      </Form>
    </Container>
  )
}