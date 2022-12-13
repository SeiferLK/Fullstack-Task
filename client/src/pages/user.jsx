import { useLoaderData } from "react-router-dom";

function Row({ label, value, even }) {
  return (
    <div className={`${even ? "bg-white" : "bg-gray-50"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value}</dd>
    </div>
  );
}

export default function User() {
  const data = useLoaderData();

  const values = [
    {
      label: "Username",
      value: data.username,
    },
    {
      label: "Data",
      value: data.data,
    },
  ];

  return (
    <div className="mx-auto mt-8 max-w-4xl overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">User Profile</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Update your account's profile information and email address.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {values.map((value, index) => {
            return <Row key={index} label={value.label} value={value.value} even={index % 2 === 0} />;
          })}
        </dl>
      </div>
    </div>
  );
}

export const loader = async () => {
  const res = await fetch("http://localhost:8080/api/user", {
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
