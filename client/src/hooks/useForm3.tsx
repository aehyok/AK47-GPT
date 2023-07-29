import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';

const Form = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onFormSubmit = (data) => {
    console.log(errors, '你是什么东西');

    onSubmit(data);
  };

  const asdasd = () => {
    console.log(errors, 'asdasdsadsa  ');
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FormControl isInvalid={errors.username}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{
            required: 'Username is required',
            pattern: {
              value: /^1[3456789]\d{9}$/,
              message: '手机号错误'
            }
          }}
          render={({ field }) => <Input {...field} />}
        />
        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Password is required' }}
          render={({ field }) => <Input type="password" {...field} />}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
      <Button mt={4} onClick={() => asdasd()} colorScheme="teal" type="submit">
        Submitssss
      </Button>
    </form>
  );
};

export default Form;
