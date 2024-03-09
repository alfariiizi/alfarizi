// import emailjs from "@emailjs/browser";
import axios from "axios";

// emailjs.init({
//   publicKey: env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
// });

type Payload = {
  email: string;
  message: string;
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get("email");
  const message = formData.get("message");
  const data = {
    lib_version: "4.3.3",
    service_id: "service_phmvnjq",
    template_id: "template_djdmdim",
    user_id: "rLYpIYijqkeWuyZmc",
    template_params: {
      from_email: email?.toString(),
      message: message?.toString(),
    },
  };

  const data2 = {
    lib_version: "4.3.3",
    user_id: "rLYpIYijqkeWuyZmc",
    service_id: "service_phmvnjq",
    template_id: "template_djdmdim",
    template_params: {
      from_email: "ntkaj@telegmail.com",
      message: "This is 1",
    },
  };

  const res = await axios
    .post("https://api.emailjs.com/api/v1.0/email/send", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(res);

  // await emailjs.send(
  //   "",
  //   "template_djdmdim",
  //   {
  //     from_email: email?.toString(),
  //     message: message?.toString(),
  //   },
  //   {
  //     publicKey: "rLYpIYijqkeWuyZmc",
  //   },
  // );

  return new Response();
}
