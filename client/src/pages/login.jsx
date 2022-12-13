import { Form } from "react-router-dom";
import { useActionData, useNavigation, redirect } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/input";

export default function Login() {
  const errors = useActionData();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";

  return (
    <div>
      <div className="mt-8">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <Form method="post" action="/login" className="mx-auto mt-8 w-full max-w-md space-y-6">
        {errors?.error && (
          <p>
            <span style={{ color: "red" }}>{errors.error}</span>
          </p>
        )}
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <Input type="text" name="username" placeholder="Username" required minLength={3} maxLength={255} />
          </div>
          <div>
            <Input type="text" name="password" placeholder="Password" minLength={3} required />
          </div>
        </div>

        <p>
          <Button type="submit" disabled={busy}>
            {busy ? "Logging in..." : "Log in"}
          </Button>
        </p>
      </Form>
    </div>
  );
}

export const action = async (args) => {
  const { request, params } = args;
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  // Request to server
  const response = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }

  return redirect("/user");
};
