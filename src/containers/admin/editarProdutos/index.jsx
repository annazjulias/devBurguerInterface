import { Controller, set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  Form,
  Input,
  InputGrup,
  Label,
  LabelUpload,
  Select,
  SubmitButton,
  ErrorMessage,
  CheckboxContainer
} from "./styled";
import { ImageIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

/* =======================
   Schema (imagem opcional)
======================= */
const schema = yup.object({
  name: yup.string().required("Digite o nome do produto"),
  price: yup
    .number()
    .positive("Preço inválido")
    .required("Digite o preço do produto")
    .typeError("Digite o preço do produto"),
  category: yup
    .object()
    .required("Escolha a categoria do produto")
    .typeError("Escolha a categoria do produto"),
  file: yup.mixed().notRequired(), // imagem opcional
  offer: yup.boolean(),
});

export function EditProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);
const navigation = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get("/categories");
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
    defaultValues: {
      name: product.name,
      price: product.price / 100,
      category: {
        value: product.category.id,
        label: product.category.name,
      },
      offer: product.offer,
    },
  });

  const onSubmit = async (data) => {
    const productFormData = new FormData();

    productFormData.append("name", data.name);
    productFormData.append("price", Number(data.price) * 100);
    productFormData.append("category_id", data.category.value);
    productFormData.append("offer", Boolean(data.offer));

    // imagem opcional
    if (data.file?.length) {
      productFormData.append("file", data.file[0]);
    }

    await toast.promise(
      api.put(`/products/${product.id}`, productFormData),
      {
        pending: "Editando produto...",
        success: "Produto editado com sucesso!",
        error: "Erro ao editar o produto.",
      }
    );

    setTimeout(() => {
      navigation("/admin/produtos");
    }, 2000);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Nome */}
        <InputGrup>
          <Label>Nome</Label>
          <Input type="text" {...register("name")} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputGrup>

        {/* Preço */}
        <InputGrup>
          <Label>Preço</Label>
          <Input type="number" step="0.01" {...register("price")} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </InputGrup>

        {/* Upload opcional */}
        <InputGrup>
          <LabelUpload>
            <ImageIcon />
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("file", {
                onChange: (e) =>
                  setFileName(e.target.files[0]?.name),
              })}
            />
            {fileName || "Alterar imagem (opcional)"}
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </InputGrup>

        {/* Categoria */}
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
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </InputGrup>

        {/* Oferta */}
        <InputGrup>
          <CheckboxContainer>
            <input type="checkbox" {...register("offer")} />
            <Label>Produto em oferta?</Label>
          </CheckboxContainer>
        </InputGrup>

        <SubmitButton>Editar produto</SubmitButton>
      </Form>
    </Container>
  );
}
