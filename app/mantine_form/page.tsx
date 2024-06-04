"use client";

import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { theme } from "../../theme";
// import { useState } from "react";
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
  Space,
  Container,
} from "@mantine/core";

// ✅ Correct order
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles/Input.css";

export default function MantineForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      fullname: "",
      gender: "male",
      termsOfService: false,
      jobType: "Software",
      age: 18,
      date: Date,
      uploadResume: "",
    },

    onValuesChange: (values) => {
      console.log(values);
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      age: (value) => (value > 18 ? null : "You must be older than 18 "),
    },
  });

  return (
    <MantineProvider theme={theme}>
      <Container size="30rem" bg={"white"}>
        <form onSubmit={form.onSubmit(() => console.log(form.getValues()))}>
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
          {/* <Text size="sm">Please Select your gender </Text> */}

          <Space h="xs" />

          <Radio.Group
            name="gender"
            label="Please select your Gender "
            withAsterisk
            defaultValue="Male"
            key={form.key("gender")}
          >
            <Group mt="xs">
              <Radio
                value="Male"
                label="Male"
                {...form.getInputProps("gender")}
              />
              <Radio
                value="Female"
                label="Female"
                {...form.getInputProps("gender")}
              />
            </Group>
          </Radio.Group>

          <Space h="md" />

          <Text size="sm">Please select Job type : </Text>
          <NativeSelect
            // value={jobType}
            data={["Finance", "Software", "Law", "Tourism"]}
            // onChange={(event) => console.log(event.currentTarget.value)}
            key={form.key("jobType")}
            {...form.getInputProps("jobType")}
          />

          <Space h="md" />

          <NumberInput
            label="Please Enter you Age "
            placeholder="18"
            {...form.getInputProps("age")}
          />
          <Space h="md" />



          <DateInput
            clearable
            defaultValue={new Date()}
            label="Select Date "
            placeholder="29/9/24"
            key={form.key("date")}
            {...form.getInputProps("date")}
          />



          <Space h="md" />
          <FileInput
            accept="image/png, image/jpg, image/jpeg"
            label="Upload files"
            placeholder="Upload files"
            multiple
            key={form.key("uploadResume")}
            {...form.getInputProps("uploadResume")}
          />

          <Space h="sm" />
          <Checkbox
            mt="md"
            label="I agree to share my data for recruitment purposes"
            key={form.key("termsOfService")}
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />

          <Space h={"lg"} />

          <Button type="submit">Submit</Button>
          {/* <Button onClick={() => console.log(form.getValues())}>Check</Button> */}
        </form>
      </Container>
    </MantineProvider>
  );
}
