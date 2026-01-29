import { Controller, useForm } from "react-hook-form";
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
  file: yup.mixed().notRequired(),
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
    try {
      const productFormData = new FormData();

      productFormData.append("name", data.name);
      productFormData.append("price", Number(data.price) * 100);
      productFormData.append("category_id", data.category.value);
      productFormData.append("offer", Boolean(data.offer));

      // Se houver uma nova imagem, faz upload para o Cloudinary
      if (data.file?.length) {
        const imageData = new FormData();
        imageData.append("file", data.file[0]);
        imageData.append("upload_preset", "seu_upload_preset"); // Configure no Cloudinary
        
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/seu_cloud_name/image/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();
        
        // Envia a URL e o public_id para o backend
        productFormData.append("path", cloudinaryData.secure_url);
        productFormData.append("public_id", cloudinaryData.public_id);
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
    } catch (error) {
      toast.error("Erro ao fazer upload da imagem");
      console.error(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGrup>
          <Label>Nome</Label>
          <Input type="text" {...register("name")} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputGrup>

        <InputGrup>
          <Label>Preço</Label>
          <Input type="number" step="0.01" {...register("price")} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </InputGrup>

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