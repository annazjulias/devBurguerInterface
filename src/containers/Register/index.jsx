import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link } from './styles';
import Logo from '../../assets/logo.svg'
import { Button } from '../../components/button'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export function Register() {
  const navigate = useNavigate()


  const schema = yup.object({
    name: yup.string().required('O nome é obrigatório'),
    email: yup.string().email("Digite um e-mail valido").required("O e-mail é obrigatorio!"),
    password: yup.string().min(6, "a senha deve ter pelo menos 6 caracteries").required("Digite uma senha"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('confirme sua senha')
  }).required();

  const { register, handleSubmit,
    formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    });
  console.log(errors)

  const onSubmit = async data => {

    try {
      const { status } = await
        api.post('/users',
          {
            name: data.name,
            email: data.email,
            password: data.password,
          },
          {
            validateSatus: () => true,
          },

        )
      if (status === 200 || status === 201) {
        setTimeout(() => {
          navigate('/login')
        }, 2000);
        toast.success('Conta criada com sucesso!')
      } else if (status === 400) {
        toast.error('Falha no sistema, tente novamente!')
      } else {
        throw new Error()
      }


    } catch (error) {
      toast.error('Email ja cadastrado! Faça login para continuar!')
    }

    console.log(status)
  }

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt='logo-devburger' />
      </LeftContainer>
      <RightContainer>
        <Title>
          Criar Conta
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Nome</label>
            <input type='text' {...register("name")} />
            <p>{errors?.name?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Email</label>
            <input type='email' {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type='password' {...register("password")} />
            <p>{errors?.password?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Confirmar senha</label>
            <input type='password' {...register("confirmPassword")} />
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>
          <Button type="submit" >Criar Conta</Button>
        </Form>
        <p>Já possui conta?  <Link to="/login">Clique aqui.</Link></p>
      </RightContainer>
    </Container>
  );
}
