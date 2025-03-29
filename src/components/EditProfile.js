import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser, logout } from '../features/userSlice';

const Container = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #cccccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #404040;
  background-color: #2a2a2a;
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #404040;
  background-color: #2a2a2a;
  color: #ffffff;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  
  ${props => props.primary ? `
    background-color: #ffffff;
    color: #1a1a1a;
    border: none;
  ` : props.danger ? `
    background-color: #dc3545;
    color: #ffffff;
    border: none;
  ` : `
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #ffffff;
  `}

  &:hover {
    opacity: 0.9;
  }
`;

const DangerZone = styled.div`
  margin-top: 4rem;
  padding: 1.5rem;
  border: 1px solid #dc3545;
  border-radius: 4px;
`;

const DangerTitle = styled.h2`
  color: #dc3545;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const DangerText = styled.p`
  color: #cccccc;
  margin-bottom: 1.5rem;
`;

const ConfirmationDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogContent = styled.div`
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const DialogTitle = styled.h3`
  color: #ffffff;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const DialogMessage = styled.p`
  color: #cccccc;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const DialogButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    description: user?.description || '',
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    navigate('/profile');
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUser());
    dispatch(logout());
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <Container>
      <Header>
        <Title>Edit Profile</Title>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>First Name</Label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Bio</Label>
          <Input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="A brief bio"
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us more about yourself"
          />
        </FormGroup>

        <ButtonGroup>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" primary>
            Save Changes
          </Button>
        </ButtonGroup>

        <DangerZone>
          <DangerTitle>Delete Account</DangerTitle>
          <DangerText>
            Once you delete your account, there is no going back. Please be certain.
          </DangerText>
          <Button type="button" danger onClick={() => setShowDeleteDialog(true)}>
            Delete Account
          </Button>
        </DangerZone>
      </Form>

      {showDeleteDialog && (
        <ConfirmationDialog>
          <DialogContent>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogMessage>
              Are you sure you want to delete your account? This action cannot be undone.
              All your data, including posts, learning plans, and progress will be permanently deleted.
            </DialogMessage>
            <DialogButtons>
              <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
              <Button danger onClick={handleDeleteAccount}>Delete Account</Button>
            </DialogButtons>
          </DialogContent>
        </ConfirmationDialog>
      )}
    </Container>
  );
}

export default EditProfile; 