import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PlanCard = ({ plan, title }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom color="primary.main" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {plan.summary}
        </Typography>

        <Box mb={3}>
          <Typography variant="h6" gutterBottom>Asset Allocation</Typography>
          <Typography variant="body2">Equities: {plan.asset_allocation.equities}</Typography>
          <Typography variant="body2">Bonds: {plan.asset_allocation.bonds}</Typography>
          <Typography variant="body2">Cash: {plan.asset_allocation.cash}</Typography>
        </Box>

        <Box mb={3}>
          <Typography variant="h6" gutterBottom>Projected Timeline</Typography>
           {Object.entries(plan.projected_goal_timeline_years).map(([goal, years]) => (
             <Typography key={goal} variant="body2">{goal}: <strong>{years} years</strong></Typography>
           ))}
        </Box>
        
        <Box>
            <Typography variant="h6" gutterBottom>Key Recommendations</Typography>
            <List dense>
                {plan.recommendations.map((rec, index) => (
                    <ListItem key={index} disableGutters>
                        <ListItemIcon sx={{minWidth: '32px'}}>
                            <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={rec} />
                    </ListItem>
                ))}
            </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlanCard;