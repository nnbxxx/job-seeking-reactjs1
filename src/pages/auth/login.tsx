import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { callLogin } from "config/api";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLoginInfo } from "@/redux/slice/accountSlide";
import styles from "styles/auth.module.scss";
import { useAppSelector } from "@/redux/hooks";
import video_bg from "../../../public/video_bg.mp4";
const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  useEffect(() => {
    //đã login => redirect to '/'
    if (isAuthenticated) {
      // navigate('/');
      window.location.href = "/job-seeking-reactjs/";
    }
  }, []);

  const onFinish = async (values: any) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(setUserLoginInfo(res.data.user));
      message.success("Đăng nhập tài khoản thành công!");
      window.location.href = callback ? callback : "/job-seeking-reactjs/";
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className={styles["login-page"]}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          zIndex: "-1",
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
          objectFit: "cover",
        }}
      >
        <source src={video_bg} type="video/mp4" />
      </video>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.wrapper}>
            <div className={styles.heading}>
              <h2
                className={`${styles.text} ${styles["text-large"]}`}
                style={{ textAlign: "center" }}
              >
                Đăng Nhập
              </h2>
              <Divider />
            </div>
            <Form
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label={
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </span>
                }
                name="username"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                ]}
              >
                <Input style={{ borderRadius: "20px", padding: "10px 11px" }} />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label={
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Mật khẩu
                  </span>
                }
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                ]}
              >
                <Input.Password
                  style={{ borderRadius: "20px", padding: "10px 11px" }}
                />
              </Form.Item>
              <p
                className="text text-normal"
                style={{
                  textAlign: "right",
                  marginBottom: "10px",
                  marginTop: "-15px",
                }}
              >
                <span style={{ display: "block" }}>
                  <Link to="/job-seeking-reactjs/forgotaccount">
                    {" "}
                    Quên mật khẩu{" "}
                  </Link>
                </span>
              </p>
              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmit}
                  style={{ borderRadius: "20px", padding: "4px 190px" }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider style={{ color: "white" }}>Or</Divider>
              <p className="text text-normal" style={{ color: "white" }}>
                Chưa có tài khoản ?
                <span>
                  <Link to="/job-seeking-reactjs/register"> Đăng Ký </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;