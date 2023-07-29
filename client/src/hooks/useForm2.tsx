import React, { useState, useEffect } from 'react';
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
  Box
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';

import { Select } from 'chakra-react-select';
import { columnsType } from '@/types/index.d';

interface Option {
  label: string;
  value: string;
}

const Form = ({
  fields,
  onSubmit,
  formData,
  type,
  onClose
}: {
  fields: columnsType[];
  onSubmit: (formValues: { [key: string]: string }, type: string) => Promise<boolean | string>;
  formData: { [key: string]: string };
  type: string;
  onClose: () => void;
}) => {
  const [formValues, setFormValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, formState } = useForm();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (options: Option[] | Option, field: columnsType) => {
    setFormValues({ ...formValues, [field.name]: options });
  };

  const onSubmitForm = async (e: any) => {
    // e.preventDefault();
    console.log(errors, '你是啊啥');

    setIsLoading(true);
    const submitForm = getSubmitFormData();
    const isSuccess = await onSubmit(submitForm, type);
    setIsLoading(false);
    // isSuccess === true && onClose();
  };

  const getSubmitFormData = () => {
    const selectFieldNames = fields
      .filter((field) => field.valueType === 'select')
      .map((field) => field.name);
    let submitForm = { ...formValues };
    selectFieldNames.forEach((name) => {
      const submitSelectValue = Array.isArray(formValues[name])
        ? formValues[name].map((option: Option) => option.value)
        : formValues[name].value;
      submitForm[name] = submitSelectValue;
    });
    console.log(submitForm, 'submitForm');

    return submitForm;
  };

  // setFormValues(formData)
  useEffect(() => {
    /** 执行逻辑 */
    setFormValues(formData);
  }, []);

  const generateComponent = (field: columnsType) => {
    const components = {
      textarea: {
        component: Textarea,
        props: { name: field.name, value: formValues[field.name] || '', onChange: handleChange }
      },
      select: {
        component: Select,
        props: {
          name: field.name,
          placeholder: '请选择',
          value: formValues[field.name] || '',
          onChange: (options: Option[] | Option) => handleSelectChange(options, field),
          options: field.options
        }
      },
      checkbox: {
        component: Checkbox,
        props: {
          name: field.name,
          isChecked: formValues[field.name] || false,
          onChange: handleChange
        }
      },
      text: {
        component: Input,
        props: {
          type: field.valueType,
          name: field.name,
          value: formValues[field.name] || '',
          onChange: handleChange
        }
      }
    };

    if (!field.valueType) return '';
    const ComponentToRender = components[field.valueType].component;
    const componentProps = { ...components[field.valueType].props, ...field.formItemProps };
    // @ts-ignore
    return <ComponentToRender {...componentProps} />;
  };
  const Ava = () => {
    console.log('你是啥', formState, control);
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
              isInvalid={true}
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

              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'name is required' }}
                render={({ fields }) => <Input {...fields} />}
              />

              <FormErrorMessage>"shadiksahi" </FormErrorMessage>
              <FormHelperText>{field.helperText}</FormHelperText>
            </FormControl>
          )
        )}
        <HStack display="flex" justifyContent={'flex-end'}>
          <Box mb="10px">
            <Button type="reset" onClick={() => setFormValues({})} mr="10px">
              清空
            </Button>
            <Button type="reset" onClick={() => Ava()} mr="10px">
              清空222
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
