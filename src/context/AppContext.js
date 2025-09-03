import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [userInput, setUserInput] = useState({
    name: '',
    age: '',
    monthly_income: '',
    monthly_expenses: '',
    assets: {
      cash_equivalents: '',
      equity_investments: '',
      other_investments: 0,
    },
    liabilities: {
      high_interest_debt: '',
      loans_emi: '',
    },
    goals: [{ name: '', target_amount: '', timeline_years: '' }],
    risk_profile_answers: [null, null],
  });

  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- NEW STATE FOR INTERACTIVE FEATURES ---
  const [simulationResults, setSimulationResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatting, setIsChatting] = useState(false);


  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleNestedInputChange = (section, event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };
  const handleGoalChange = (index, event) => {
    const { name, value } = event.target;
    const newGoals = [...userInput.goals];
    newGoals[index][name] = value;
    setUserInput((prev) => ({ ...prev, goals: newGoals }));
  };
  const addGoal = () => {
    setUserInput((prev) => ({
      ...prev,
      goals: [...prev.goals, { name: '', target_amount: '', timeline_years: '' }],
    }));
  };
  const removeGoal = (index) => {
  setUserInput((prev) => ({
    ...prev,
    goals: prev.goals.filter((_, i) => i !== index)
  }));
};
  const handleRiskChange = (questionIndex, event) => {
    const { value } = event.target;
    const newAnswers = [...userInput.risk_profile_answers];
    newAnswers[questionIndex] = parseInt(value, 10);
    setUserInput(prev => ({ ...prev, risk_profile_answers: newAnswers }));
  };

  // --- NEW HANDLERS FOR CHAT ---
  const addUserMessageToChat = (message) => {
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
  };
  const addAssistantMessageToChat = (message) => {
    setChatHistory(prev => [...prev, { role: 'assistant', content: message }]);
  };

  const value = {
    activeStep,
    nextStep,
    prevStep,
    userInput,
    handleInputChange,
    handleNestedInputChange,
    handleGoalChange,
    addGoal,
    removeGoal,
    
    handleRiskChange,
    generatedPlan,
    setGeneratedPlan,
    isLoading,
    setIsLoading,
    error,
    setError,
    // --- EXPORT NEW STATE AND HANDLERS ---
    simulationResults,
    setSimulationResults,
    isSimulating,
    setIsSimulating,
    chatHistory,
    isChatting,
    setIsChatting,
    addUserMessageToChat,
    addAssistantMessageToChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};