"use client";

import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { theme } from "../../theme";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import {
  Button,
  Checkbox,
  Group,
  TextInput,
  Radio,
  NumberInput,
  NativeSelect,
  FileInput,
  Text,
  Flex,
  Space,
  Container,
} from "@mantine/core";

import "@mantine/core/styles.css";

export default function MantineForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      fullname: "",
      gender: true,
      termsOfService: false,
      jobType: "finance",
      age: 18,
      date: Date,
      uploadResume: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      age: (value) => (value > 18 ? null : "You must be older than 18 "),
    },
  });

  const [gender, setGender] = useState(true);
  const [value, setValue] = useState("");

  return (
    <MantineProvider theme={theme}>
      <Container size="30rem" bg={"white"}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          {/* Text */}

          <Space h="md" />

          <TextInput
            withAsterisk
            label="Full name"
            placeholder="John Smith"
            key={form.key("fullname")}
            {...form.getInputProps("fullname")}
          />

          <Space h="md" />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Space h="md" />
          <Text size="sm">Please Select your gender </Text>

          <Space h="xs" />
          <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Radio
              checked={gender}
              label="Male"
              onChange={() => setGender(true)}
              key={form.key("gender")}
            />
            <Radio
              label="Female"
              checked={!gender}
              onChange={() => setGender(false)}
            />
          </Flex>

          <Text size="sm">Please select Job type : </Text>
          <NativeSelect
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            data={["Finance", "Software", "Law", "Tourism"]}
          />

          <Space h="md" />

          <NumberInput label="Please Enter you Age " placeholder="18" />
          <Space h="md" />
          <DateInput
            clearable
            defaultValue={new Date()}
            label="Select Date "
            placeholder="29/9/24"
          />
          <Space h="md" />
          <FileInput
            accept="iimage/png, image/jpg, image/jpeg"
            label="Upload files"
            placeholder="Upload files"
            multiple
          />

          <Space h="sm" />
          <Checkbox
            mt="md"
            label="I agree to share my data for recruitment purposes"
            key={form.key("termsOfService")}
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Container>
    </MantineProvider>
  );
}
