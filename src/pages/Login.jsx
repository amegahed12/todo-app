import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is Required")
    .min(8, "Username Must Be At least 8 Characters"),
  password: yup
    .string()
    .required("Password is Required")
    .min(8, "Password Must Be At least 8 Characters")
    .matches(/^[A-Za-z0-9]+$/, "Password must contain only alphanumeric"),
});
export default function Login() {
  const handleSubmit = (values) => {
    console.log({ values });
  };
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });
  console.log({ e: formik.errors });
  return (
    <div className="flex justify-center mt-4">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center gap-4 border p-4 rounded border-green-500"
      >
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            placeholder="Enter Your Username"
            className="border-green-100 mt-1 active:border-0 p-1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.errors.username}
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            className="border-green-100 mt-1 active:border-0 p-1"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password}
        </div>
        <button
          disabled={Object.keys(formik.errors).length}
          type="submit"
          className="bg-green-200 p-2 rounded disabled:bg-gray-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
