import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addLearningProgress, updateLearningProgress, deleteLearningProgress } from '../features/userSlice';

const ProgressContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #ffffff;
`;

const Subtitle = styled.p`
  color: #808080;
  margin: 0.5rem 0;
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  color: #1a1a1a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProgressCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardTitle = styled.h2`
  color: #ffffff;
  margin: 0;
`;

const CardDescription = styled.p`
  color: #808080;
  margin: 0;
  font-size: 0.9rem;
`;

const StepsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
`;

const StepItem = styled.li`
  color: #808080;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "•";
    color: #ffffff;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #2a2a2a;
  border-radius: 2px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const ProgressFill = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #ffffff;
  transition: width 0.3s ease;
`;

const ProgressText = styled.span`
  color: #808080;
  font-size: 0.9rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  background: none;
  border: none;
  color: #808080;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: #ffffff;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #404040;
  background-color: #1a1a1a;
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
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const CancelButton = styled(AddButton)`
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
`;

function LearningProgress() {
  const dispatch = useDispatch();
  const { learningProgress } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgress, setEditingProgress] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: [],
    progress: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const progressData = {
      ...formData,
      progress: parseInt(formData.progress)
    };

    if (editingProgress) {
      dispatch(updateLearningProgress({ id: editingProgress.id, ...progressData }));
    } else {
      dispatch(addLearningProgress(progressData));
    }

    setIsModalOpen(false);
    setEditingProgress(null);
    setFormData({
      title: '',
      description: '',
      steps: [],
      progress: 0
    });
  };

  const handleEdit = (progress) => {
    setEditingProgress(progress);
    setFormData({
      title: progress.title,
      description: progress.description,
      steps: progress.steps || [],
      progress: progress.progress
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this progress?')) {
      dispatch(deleteLearningProgress(id));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingProgress(null);
    setFormData({
      title: '',
      description: '',
      steps: [],
      progress: 0
    });
  };

  return (
    <ProgressContainer>
      <Header>
        <div>
          <Title>Learning Progress</Title>
          <Subtitle>Track your learning journey</Subtitle>
        </div>
        <AddButton onClick={() => setIsModalOpen(true)}>Add New Progress</AddButton>
      </Header>

      <ProgressGrid>
        {learningProgress?.map(progress => (
          <ProgressCard key={progress.id}>
            <CardTitle>{progress.title}</CardTitle>
            <CardDescription>{progress.description}</CardDescription>
            
            <StepsList>
              {progress.steps?.map((step, index) => (
                <StepItem key={index}>{step}</StepItem>
              ))}
            </StepsList>

            <ProgressBar>
              <ProgressFill progress={progress.progress} />
            </ProgressBar>
            <ProgressText>{progress.progress}% Complete</ProgressText>

            <CardActions>
              <ActionButton onClick={() => handleEdit(progress)}>✏️</ActionButton>
              <ActionButton onClick={() => handleDelete(progress.id)}>🗑️</ActionButton>
            </CardActions>
          </ProgressCard>
        ))}
      </ProgressGrid>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <TextArea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <TextArea
                placeholder="Steps (one per line)"
                value={formData.steps.join('\n')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  steps: e.target.value.split('\n').filter(step => step.trim()) 
                })}
                required
              />
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="Progress percentage"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                required
              />
              <ButtonGroup>
                <CancelButton type="button" onClick={handleCancel}>
                  Cancel
                </CancelButton>
                <AddButton type="submit">
                  {editingProgress ? 'Update Progress' : 'Add Progress'}
                </AddButton>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </ProgressContainer>
  );
}

export default LearningProgress; 