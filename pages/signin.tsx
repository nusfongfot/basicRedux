import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
YupPassword(yup);
import * as yup from "yup";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { loginUser } from "@/services/auth.service";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const schema = yup
  .object({
    email: yup
      .string()
      .required("กรุณากรอกอีเมล")
      .email("รูปแบบอีเมลไม่ถูกต้อง"),
    password: yup.string().required("กรุณากรอกรหัสผ่าน"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await loginUser(data.email, data.password!);
      if (userCredential.user !== null) {
        toast.success("เข้าสู่ระบบสำเร็จ");
        router.replace('/dashmenu/t?type=home', undefined, { shallow: true })
      }
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        toast("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : null}
              {...register("email")}
              fullWidth
              label="Email Address"
            />
            <TextField
              sx={{ mt: 1 }}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : null}
              {...register("password")}
              fullWidth
              label="Password"
              type="password"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
              loadingIndicator={"กำลังเข้าสู่ระบบ กรุณารอสักครู่..."}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Back to Home
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
