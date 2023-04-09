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
import { LoadingButton } from "@mui/lab";
import { useAccount } from "@/hooks/use-account";
import { useAppDispatch } from "@/reduxToolkit/hooks";
import {
  getCurrentAccountThunk,
  updateAccountThunk,
} from "@/reduxToolkit/auth/authThunk";

const schema = yup
  .object({
    firstname: yup.string().required("กรุณากรอกชื่อ"),
    lastname: yup.string().required("กรุณากรอกนามสกุล"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function EditProfile() {
  const router = useRouter();
  const { account } = useAccount();
  const dispatch = useAppDispatch();

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
      await dispatch(
        updateAccountThunk({
          userId: account?.userId,
          acc: {
            firstname: data.firstname,
            lastname: data.lastname,
          },
        })
      );

      await dispatch(getCurrentAccountThunk(account?.userId!));
      toast.success("แก้ไขข้อมูลสำเร็จ");
      router.push("/dashmenu/t?type=home");
    } catch (error: any) {
      toast.error(error);
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
          <Typography component="h1" variant="h5">
            แก้ไข Profile
          </Typography>
          <Avatar
            src={account?.photoUrl}
            sx={{ m: 1, width: 62, height: 62 }}
          />

          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>

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
                  defaultValue={account?.firstname}
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
                  defaultValue={account?.lastname}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} mt={5}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => router.back()}
              >
                ย้อนกลับ
              </Button>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isSubmitting}
                loadingIndicator={"กำลังแก้ไขข้อมูล กรุณารอสักครู่..."}
              >
                ยืนยัน
              </LoadingButton>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
