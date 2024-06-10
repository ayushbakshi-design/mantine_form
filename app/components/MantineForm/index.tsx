"use client";

import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import {
  MantineProvider,
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

// Importing Stylesheets for Individual Componenets As per Mantine documentation
import MantineProviderTheme from "../../../MantineProviderTheme";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles/Input.css";

export default function MantineForm() {
  interface InitialValuesInterface {
    email: string;
    fullname: string;
    gender: string;
    termsOfService: boolean;
    jobType: string;
    age: number;
    date: Date;
    uploadResume: File[];
  }

  const [SelectedFiles, SetSelectedFiles] = useState<File[]>([]);
  const MaxFileSize = 2 * 1024 * 1024;

  useEffect(() => {
    form.setFieldValue("uploadResume", SelectedFiles);
    console.log(SelectedFiles);
  }, [SelectedFiles]);

  const ValidateFiles = (FileArray: File[]) => {
    FileArray.forEach((file, index) => {
      if (file.size > MaxFileSize) {
        alert(
          `File ${index + 1} is larger than 2Mb. Please select anothe file`
        );
        form.setFieldValue("uploadResume", []);
      } else {
        SetSelectedFiles(() => [...SelectedFiles, ...FileArray]);
      }
    });
  };

  const form = useForm({
    mode: "uncontrolled",

    initialValues: {
      email: "",
      fullname: "",
      gender: "male",
      termsOfService: false,
      jobType: "Software",
      age: 18,
      date: new Date(),
      uploadResume: [],
    } as InitialValuesInterface,

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      age: (value: number) =>
        value > 18 ? null : "You must be older than 18 ",
      termsOfService: (value: boolean) =>
        value === true
          ? null
          : "You cannot proceed without agreeing to terms & Conditions ",
      fullname: (value: string) =>
        value.length > 2 && value.length < 50
          ? null
          : "please write your full name",
      uploadResume: (value: File[]) =>
        value.length < 4 ? null : "you cannot uplaod more than 3 Files",
    },
  });

  return (
    <MantineProvider theme={MantineProviderTheme}>
      <Container size="30rem" bg={"white"}>
        <form
          encType="multipart/form-data"
          onSubmit={form.onSubmit(() => console.log(form.getValues()))}
        >
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
            key={form.key("gender")}
          >
            <Group mt="xs">
              <Radio value="Male" label="Male" />
              <Radio value="Female" label="Female" />
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
            onChange={ValidateFiles}
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
