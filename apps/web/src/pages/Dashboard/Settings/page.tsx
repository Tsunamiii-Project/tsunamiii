import {
  Button,
  Container,
  Modal,
  PasswordInput,
  TextInput,
  useMantineTheme
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useUserContext } from '@web/contexts/user';
import { DashboardLayout } from '@web/layouts';
import { AuthService } from '@web/services';
import { Form, TitleForm } from '@web/utils/styles';
import { TAuthDataUpdate } from '@web/utils/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function DashboardSettingsPage() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useMantineTheme();
  const [openModal, setOpenModal] = useState(false);

  const form = useForm({
    initialValues: {
      user: {
        username: user?.username,
        password: ''
      }
    },

    validate: {
      user: {
        username: value =>
          value!.length < 2 ? 'Username must have at least 2 letters' : null
      }
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { data, status } = await AuthService.updateUser(
      values as TAuthDataUpdate
    );
    if (status === 200) {
      setUser(data);
    }
  };

  const deleteAccount = async () => {
    const { status } = await AuthService.deleteAccount();
    if (status === 200) {
      navigate('/');
    }
  };

  return (
    <DashboardLayout title="Settings">
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        overlayColor={theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        fullScreen={isMobile}
        title="Are you sure ? You really want to delete your account ?"
      >
        <Button.Group>
          <Button onClick={() => setOpenModal(false)} color="blue">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="red">
            {`I'm sure I want delete my account`}
          </Button>
        </Button.Group>
      </Modal>
      <Container my="lg">
        <Form onSubmit={form.onSubmit(handleSubmit)}>
          <TitleForm>Settings</TitleForm>
          <TextInput
            label="Username"
            placeholder="Username"
            {...form.getInputProps('user.username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            mt="md"
            {...form.getInputProps('user.password')}
          />
          <Button.Group style={{ marginTop: '12px' }}>
            <Button type="submit">Submit</Button>
            <Button onClick={() => setOpenModal(true)} color="red">
              Delete your account
            </Button>
          </Button.Group>
        </Form>
      </Container>
    </DashboardLayout>
  );
}
