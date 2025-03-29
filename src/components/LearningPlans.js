import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addLearningPlan, updateLearningPlan, deleteLearningPlan } from '../features/userSlice';

const LearningPlansContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
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

const CreateButton = styled.button`
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

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PlanCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PlanTitle = styled.h2`
  color: #ffffff;
  margin: 0;
`;

const PlanDescription = styled.p`
  color: #808080;
  margin: 0;
  font-size: 0.9rem;
`;

const PlanProgress = styled.div`
  width: 100%;
  height: 4px;
  background-color: #2a2a2a;
  border-radius: 2px;
  overflow: hidden;
  margin: 0.5rem 0;
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
  margin-left: 0.5rem;
`;

const PlanStats = styled.div`
  display: flex;
  justify-content: space-between;
  color: #808080;
  font-size: 0.9rem;
`;

const PlanActions = styled.div`
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

const CancelButton = styled(CreateButton)`
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
`;

const TopicsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
`;

const TopicItem = styled.li`
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

const ResourcesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
`;

const ResourceItem = styled.li`
  color: #808080;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "🔗";
  }
`;

const SectionTitle = styled.h3`
  color: #ffffff;
  font-size: 0.9rem;
  margin: 1rem 0 0.5rem 0;
`;

function LearningPlans() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topics: [],
    resources: [],
    endDate: '',
    hoursAllocated: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const planData = {
      ...formData,
      hoursAllocated: parseInt(formData.hoursAllocated)
    };

    if (editingPlan) {
      dispatch(updateLearningPlan({ id: editingPlan.id, ...planData }));
    } else {
      dispatch(addLearningPlan(planData));
    }

    setIsModalOpen(false);
    setEditingPlan(null);
    setFormData({
      title: '',
      description: '',
      topics: [],
      resources: [],
      endDate: '',
      hoursAllocated: ''
    });
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      title: plan.title,
      description: plan.description,
      topics: plan.topics || [],
      resources: plan.resources || [],
      endDate: plan.endDate,
      hoursAllocated: plan.hoursAllocated.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this learning plan?')) {
      dispatch(deleteLearningPlan(id));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
    setFormData({
      title: '',
      description: '',
      topics: [],
      resources: [],
      endDate: '',
      hoursAllocated: ''
    });
  };

  return (
    <LearningPlansContainer>
      <Header>
        <Title>Learning Plans</Title>
        <CreateButton onClick={() => setIsModalOpen(true)}>Create New Plan</CreateButton>
      </Header>
      <PlansGrid>
        {user?.learningPlans?.map(plan => (
          <PlanCard key={plan.id}>
            <PlanTitle>{plan.title}</PlanTitle>
            <PlanDescription>{plan.description}</PlanDescription>
            
            <SectionTitle>Topics</SectionTitle>
            <TopicsList>
              {plan.topics?.map((topic, index) => (
                <TopicItem key={index}>{topic}</TopicItem>
              ))}
            </TopicsList>

            <SectionTitle>Resources</SectionTitle>
            <ResourcesList>
              {plan.resources?.map((resource, index) => (
                <ResourceItem key={index}>{resource}</ResourceItem>
              ))}
            </ResourcesList>

            <PlanProgress>
              <ProgressBar>
                <ProgressFill progress={plan.progress} />
              </ProgressBar>
              <ProgressText>{plan.progress}% Complete</ProgressText>
            </PlanProgress>
            <PlanStats>
              <span>{plan.completed}/{plan.total} modules completed</span>
            </PlanStats>
            <PlanActions>
              <ActionButton onClick={() => handleEdit(plan)}>✏️</ActionButton>
              <ActionButton onClick={() => handleDelete(plan.id)}>🗑️</ActionButton>
            </PlanActions>
          </PlanCard>
        ))}
      </PlansGrid>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Plan title"
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
                placeholder="Topics (one per line)"
                value={formData.topics.join('\n')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  topics: e.target.value.split('\n').filter(topic => topic.trim()) 
                })}
                required
              />
              <TextArea
                placeholder="Resources (one per line)"
                value={formData.resources.join('\n')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  resources: e.target.value.split('\n').filter(resource => resource.trim()) 
                })}
                required
              />
              <Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
              <Input
                type="number"
                name="hoursAllocated"
                placeholder="Hours Allocated"
                value={formData.hoursAllocated}
                onChange={handleChange}
                required
              />
              <ButtonGroup>
                <CancelButton type="button" onClick={handleCancel}>
                  Cancel
                </CancelButton>
                <CreateButton type="submit">
                  {editingPlan ? 'Update Plan' : 'Create Plan'}
                </CreateButton>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </LearningPlansContainer>
  );
}

export default LearningPlans; 