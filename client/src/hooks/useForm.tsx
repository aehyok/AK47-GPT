import React, { useState, useEffect, useMemo } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Checkbox,
  Button,
  VStack,
  HStack,
  // Select,
  Box
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';

import { Select } from 'chakra-react-select';
import { columnsType } from '@/types/index.d';

interface Option {
  label: string;
  value: string;
}
enum errorType {
  import = '输入',
  choose = '选择'
}

const Form = ({
  fields,
  onSubmit,
  formData,
  type,
  onClose
}: {
  fields: columnsType[];
  onSubmit: (formValues: { [key: string]: any }, type: string) => Promise<boolean | string>;
  formData: { [key: string]: string };
  type: string;
  onClose: () => void;
}) => {
  const [formValues, setFormValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const handleChange = (e: { [key: string]: any }) => {
    const { name, value } = e.target;
    console.log(e, '调');

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (options: Option[] | Option, field: columnsType) => {
    setFormValues({ ...formValues, [field.name]: options });
  };

  const onSubmitForm = async (e: { [key: string]: any }) => {
    console.log(e, 'e');

    // e.preventDefault();
    setIsLoading(true);
    const submitForm = getSubmitFormData(e);
    const isSuccess = await onSubmit(submitForm, type);
    setIsLoading(false);
    isSuccess === true && onClose();
  };

  const getSubmitFormData = (e: { [key: string]: any }) => {
    const selectFieldNames = fields
      .filter((field) => field.valueType === 'select')
      .map((field) => field.name);
    let submitForm = { ...e };
    console.log(submitForm, 'submitForm1111', formValues, selectFieldNames);

    selectFieldNames.forEach((name) => {
      const submitSelectValue = Array.isArray(e[name])
        ? e[name].map((option: Option) => option.value)
        : e[name].value;
      submitForm[name] = submitSelectValue;
    });
    console.log(submitForm, 'submitForm');

    return { ...submitForm, _id: formData._id };
  };

  const getErrorMessage = useMemo(() => {
    return function (type: string) {
      if (type && ['select', 'checkbox'].includes(type)) return errorType.choose;
      else return errorType.import;
    };
  }, []);

  const defaultFromValue = useMemo(() => {
    return function (
      type: string | undefined,
      name: string,
      option: { label: string; value: string | boolean }[] | undefined
    ) {
      if (type && ['select', 'checkbox'].includes(type)) {
        // 多选返回的值 未测试
        const changeValue = option!.find((item) => item.value === formData[name]);
        return changeValue;
      } else return formData[name];
    };
  }, []);
  useEffect(() => {
    /** 执行逻辑 */
    setFormValues(formData);
  }, []);

  const generateComponent = (field: columnsType, refField: any) => {
    console.log(refField, 'fieldsaasdhasuidhsa');
    const components = {
      textarea: {
        component: Textarea,
        props: {
          type: field.valueType,
          name: field.name,
          // value: formValues[field.name] || '',
          // onChange: handleChange
          ...refField
        }
      },
      select: {
        component: Select,
        props: {
          name: field.name,
          placeholder: '请选择',
          value: formValues[field.name] || '',
          options: field.options,
          onChange: (options: Option[] | Option) => handleSelectChange(options, field),
          ...refField
        }
      },
      checkbox: {
        component: Checkbox,
        props: {
          name: field.name,
          isChecked: formValues[field.name] || false,
          // onBlur: refField.onBlur,
          // ref: refField.ref,
          onChange: handleChange
        }
      },
      text: {
        component: Input,
        props: {
          type: field.valueType,
          name: field.name,
          // value: formValues[field.name] || '',
          ...refField
          // onBlur: refField.onBlur,
          // ref: refField.ref,
          // onChange: handleChange
        }
      },
      number: {
        component: Input,
        props: {
          type: field.valueType,
          name: field.name,
          // value: formValues[field.name] || 0,
          ...refField
          // onBlur: refField.onBlur,
          // ref: refField.ref,
          // onChange: handleChange
        }
      }
    };

    if (!field.valueType) return <div></div>;
    const ComponentToRender = components[field.valueType].component;
    const componentProps = { ...components[field.valueType].props, ...field.formItemProps };
    // console.log(componentProps, '你是什么的');

    // @ts-ignore
    return <ComponentToRender {...componentProps} />;
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <VStack spacing={4} align="stretch">
        {fields.map((field: columnsType) =>
          field.hideInForm ? (
            ''
          ) : (
            <FormControl
              key={field.name}
              id={field.name}
              isRequired={field.required}
              isInvalid={errors[field.name]}
            >
              <FormLabel htmlFor="name">{field.label}</FormLabel>
              {/* {generateComponent(field)} */}

              {/* <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'name is required' }}
                render={() => generateComponent(field)}
              /> */}
              {/* ${getErrorMessage(field!.valueType as string) */}
              <Controller
                name={field.name}
                control={control}
                defaultValue={defaultFromValue(field.valueType, field.name, field.options)}
                rules={{
                  required: field.required
                    ? `请${getErrorMessage(field.valueType as string)}${field.label}`
                    : false,
                  ...field.rules
                }}
                render={({ field: refField }) => generateComponent(field, refField)}
              />

              <FormErrorMessage>
                {(errors[field.name] && errors[field.name]!.message) as string}
                {/* {errors.code && errors.code.message} */}
              </FormErrorMessage>
              <FormHelperText>{field.helperText}</FormHelperText>
            </FormControl>
          )
        )}
        <HStack display="flex" justifyContent={'flex-end'}>
          <Box mb="10px">
            <Button type="reset" onClick={() => setFormValues({})} mr="10px">
              清空
            </Button>
            <Button type="submit" colorScheme="red" isLoading={isLoading}>
              确定
            </Button>
          </Box>
        </HStack>
      </VStack>
    </form>
  );
};

export default Form;
