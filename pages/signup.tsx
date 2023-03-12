import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
YupPassword(yup);
import * as yup from "yup";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { registerUser } from "@/services/auth.service";
import { LoadingButton } from "@mui/lab";

function Copyright(props: any) {
  const router = useRouter();
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
    firstname: yup.string().required("กรุณากรอกชื่อ"),
    lastname: yup.string().required("กรุณากรอกนามสกุล"),
    email: yup
      .string()
      .required("กรุณากรอกอีเมล")
      .email("รูปแบบอีเมลไม่ถูกต้อง"),
    password: yup
      .string()
      .required("กรุณากรอกรหัสผ่าน")
      .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัว ขึ้นไป")
      .minSymbols(1, "ต้องมีอักษรพิเศษ อย่างน้อย 1 ตัว")
      .minUppercase(1, "รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function SignUp() {
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
      const userCredential = await registerUser(
        data.firstname,
        data.lastname,
        data.email,
        data.password!
      );
      if (userCredential.user !== null) {
        toast.success("ลงทะเบียนสำเร็จ");
        router.push("/");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast("มีผู้ใช้งานอีเมลน์นี้แล้ว");
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstname")}
                  error={errors.firstname ? true : false}
                  helperText={
                    errors.firstname ? errors.firstname.message : null
                  }
                  fullWidth
                  label="Firstname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastname")}
                  error={errors.lastname ? true : false}
                  helperText={errors.lastname ? errors.lastname.message : null}
                  fullWidth
                  label="Lastname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.email ? true : false}
                  helperText={errors.email ? errors.email.message : null}
                  {...register("email")}
                  fullWidth
                  label="Email Address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password.message : null}
                  {...register("password")}
                  fullWidth
                  label="Password"
                  type="password"
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
              loadingIndicator={"กำลังลงทะเบียน กรุณารอสักครู่..."}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}
