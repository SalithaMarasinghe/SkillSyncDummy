import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser, logout } from '../features/userSlice';

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #cccccc;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #404040;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  color: #1a1a1a;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ff4444;
  color: #ffffff;

  &:hover {
    background-color: #ff6666;
  }
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
`;

const DialogMessage = styled.p`
  color: #cccccc;
  margin-bottom: 1.5rem;
`;

const DialogButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    description: user?.description || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    alert('Profile updated successfully!');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Handle password update here
    alert('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      dispatch(deleteUser());
      dispatch(logout());
      navigate('/');
    }
  };

  return (
    <SettingsContainer>
      <Section>
        <SectionTitle>Profile Settings</SectionTitle>
        <Form onSubmit={handleProfileUpdate}>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Bio</Label>
            <Input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>

          <Button type="submit">Save Changes</Button>
        </Form>
      </Section>

      <Section>
        <SectionTitle>Account Settings</SectionTitle>
        <Form onSubmit={handlePasswordUpdate}>
          <FormGroup>
            <Label>Current Password</Label>
            <Input 
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>New Password</Label>
            <Input 
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Confirm New Password</Label>
            <Input 
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </FormGroup>

          <Button type="submit">Change Password</Button>
        </Form>
      </Section>

      <Section>
        <SectionTitle>Danger Zone</SectionTitle>
        <DeleteButton onClick={() => setShowDeleteDialog(true)}>
          Delete Account
        </DeleteButton>
      </Section>

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
              <DeleteButton onClick={handleDeleteAccount}>Delete Account</DeleteButton>
            </DialogButtons>
          </DialogContent>
        </ConfirmationDialog>
      )}
    </SettingsContainer>
  );
}

export default Settings; 