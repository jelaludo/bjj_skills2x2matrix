import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Chip,
  Divider,
  Paper
} from '@mui/material';
import {
  School as SchoolIcon,
  Science as ScienceIcon,
  FitnessCenter as FitnessIcon,
  Psychology as PsychologyIcon,
  HealthAndSafety as HealthIcon
} from '@mui/icons-material';

interface Study {
  id: string;
  title: string;
  url: string;
  source: string;
  category: 'strength' | 'psychology' | 'injury-prevention' | 'physiology' | 'training';
  description: string;
  year?: string;
}

const studies: Study[] = [
  {
    id: 'grapple-science-demands',
    title: 'The Unique Physical and Mental Demands of Grappling Sports',
    url: 'https://grapplescience.com/blogs/journal/the-unique-physical-and-mental-demands-of-grappling-sports',
    source: 'Grapple Science',
    category: 'physiology',
    description: 'Comprehensive analysis of the physiological and psychological demands of grappling sports, including strength, endurance, flexibility, and mental acuity requirements.',
    year: '2024'
  },
  {
    id: 'strengthlog-judo',
    title: 'Strength Training for Judo',
    url: 'https://www.strengthlog.com/strength-training-for-judo',
    source: 'StrengthLog',
    category: 'strength',
    description: 'Evidence-based strength training protocols specifically designed for judo athletes, covering power development and sport-specific movements.',
    year: '2023'
  },
  {
    id: 'springer-grappling-physiology',
    title: 'Physiological Demands of Grappling Sports',
    url: 'https://sportsmedicine-open.springeropen.com/articles/10.1186/s40798-016-0069-5',
    source: 'Sports Medicine - Open',
    category: 'physiology',
    description: 'Scientific research on the physiological characteristics of elite grappling athletes, including aerobic and anaerobic capacity analysis.',
    year: '2016'
  },
  {
    id: 'nsca-wrestling',
    title: 'Wrestling Performance and Training',
    url: 'https://www.nsca.com/education/articles/kinetic-select/wrestling/',
    source: 'NSCA',
    category: 'training',
    description: 'National Strength and Conditioning Association resources on wrestling-specific training methodologies and performance optimization.',
    year: '2023'
  },
  {
    id: 'pmc-injury-prevention',
    title: 'Injury Prevention in Combat Sports',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10525228',
    source: 'PMC - National Library of Medicine',
    category: 'injury-prevention',
    description: 'Systematic review of injury prevention strategies in combat sports, including grappling-specific recommendations.',
    year: '2023'
  },
  {
    id: 'scienceforsport-injury',
    title: 'Injury Prevention for Grappling Sports',
    url: 'https://www.scienceforsport.com/injury-prevention-grappling-sports/',
    source: 'Science for Sport',
    category: 'injury-prevention',
    description: 'Evidence-based approach to preventing common injuries in grappling sports through proper training and recovery protocols.',
    year: '2023'
  },
  {
    id: 'pmc-performance-analysis',
    title: 'Performance Analysis in Combat Sports',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5260595',
    source: 'PMC - National Library of Medicine',
    category: 'training',
    description: 'Comprehensive analysis of performance factors in combat sports, including technical, tactical, and physical components.',
    year: '2017'
  }
];

const getCategoryIcon = (category: Study['category']) => {
  switch (category) {
    case 'strength':
      return <FitnessIcon />;
    case 'psychology':
      return <PsychologyIcon />;
    case 'injury-prevention':
      return <HealthIcon />;
    case 'physiology':
      return <ScienceIcon />;
    case 'training':
      return <SchoolIcon />;
    default:
      return <SchoolIcon />;
  }
};

const getCategoryColor = (category: Study['category']) => {
  switch (category) {
    case 'strength':
      return 'primary';
    case 'psychology':
      return 'secondary';
    case 'injury-prevention':
      return 'error';
    case 'physiology':
      return 'info';
    case 'training':
      return 'success';
    default:
      return 'default';
  }
};

const getCategoryLabel = (category: Study['category']) => {
  switch (category) {
    case 'strength':
      return 'Strength Training';
    case 'psychology':
      return 'Psychology';
    case 'injury-prevention':
      return 'Injury Prevention';
    case 'physiology':
      return 'Physiology';
    case 'training':
      return 'Training Methods';
    default:
      return category;
  }
};

export const Studies: React.FC = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SchoolIcon />
        Academic Studies & Research
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Curated collection of academic articles and research papers focused on grappling sports, 
        including Brazilian Jiu-Jitsu, Judo, and Wrestling. These studies provide evidence-based 
        insights into training methodologies, injury prevention, and performance optimization.
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 3 
      }}>
        {studies.map((study) => (
          <Card 
            key={study.id}
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                {getCategoryIcon(study.category)}
                <Chip 
                  label={getCategoryLabel(study.category)}
                  color={getCategoryColor(study.category)}
                  size="small"
                />
                {study.year && (
                  <Chip 
                    label={study.year}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                {study.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                {study.description}
              </Typography>

              <Box sx={{ mt: 'auto' }}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Source: {study.source}
                </Typography>
                <Link 
                  href={study.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Read Full Article →
                </Link>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Paper sx={{ mt: 4, p: 3, backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
        <Typography variant="h6" gutterBottom>
          About This Collection
        </Typography>
        <Typography variant="body2" color="text.secondary">
          These studies represent peer-reviewed research and evidence-based practices in grappling sports. 
          They cover various aspects including strength training, injury prevention, psychological factors, 
          and physiological demands. Use these resources to inform your training approach and understand 
          the scientific principles behind effective grappling performance.
        </Typography>
      </Paper>
    </Box>
  );
}; 