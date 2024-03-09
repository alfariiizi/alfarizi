import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type Props = {
  emailSender: string;
  message: string;
};

export default function ContactFormEmail({ emailSender, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>New message from your website!</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Heading>
                {emailSender} send you message from your website
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>Sender email: {emailSender}</Text>
              <Text>
                Coming from:{" "}
                <Link href="https://alfarizi.vercel.app">Alfarizi Website</Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
