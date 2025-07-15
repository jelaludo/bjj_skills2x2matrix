import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Chip,
  Button,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  Storage as StorageIcon,
  Computer as ComputerIcon,
  CloudUpload as CloudUploadIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  Backup as BackupIcon
} from '@mui/icons-material';

interface DevModeToggleProps {
  isDevelopment: boolean;
  dataSource: 'mongodb' | 'local';
  setDataSource: (source: 'mongodb' | 'local') => void;
  masterLists: Array<{ 
    name: string; 
    path: string; 
    lastModified: Date; 
    date: string; 
    nodeCount: number; 
    displayName: string; 
  }>;
  selectedMasterList: string;
  setSelectedMasterList: (file: string) => void;
  onConvertToMongo?: () => void;
  onSeedFromLocal?: () => void;
  onCreateBackup?: () => void;
  onRestoreFromBackup?: (backupFile: string) => void;
}

export const DevModeToggle: React.FC<DevModeToggleProps> = ({
  isDevelopment,
  dataSource,
  setDataSource,
  masterLists,
  selectedMasterList,
  setSelectedMasterList,
  onConvertToMongo,
  onSeedFromLocal,
  onCreateBackup,
  onRestoreFromBackup
}) => {
  const [open, setOpen] = useState(false);
  const [backups, setBackups] = useState<Array<{
    name: string;
    path: string;
    lastModified: Date;
    size: number;
    type: 'json' | 'typescript';
    metadata?: {
      date: string;
      time: string;
      nodeCount: number;
      fullDate: Date;
    };
  }>>([]);
  const [showBackups, setShowBackups] = useState(false);

  if (!isDevelopment) {
    return null;
  }

  const handleDataSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSource = event.target.checked ? 'local' : 'mongodb';
    setDataSource(newSource);
  };

  const handleOpen = () => {
    setOpen(true);
    loadBackups();
  };
  const handleClose = () => setOpen(false);

  const loadBackups = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/list-backups');
      if (response.ok) {
        const data = await response.json();
        setBackups(data.backups);
      }
    } catch (error) {
      console.error('Failed to load backups:', error);
    }
  };

  const selectedFile = masterLists.find(file => file.name === selectedMasterList);
  
  // Debug logging
  console.log('DevModeToggle - masterLists:', masterLists);
  console.log('DevModeToggle - selectedMasterList:', selectedMasterList);
  console.log('DevModeToggle - dataSource:', dataSource);

  return (
    <>
      {/* Dev Mode Button */}
      <Button
        variant="contained"
        color="warning"
        startIcon={<WarningIcon />}
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          borderRadius: 2,
          px: 2,
          py: 1,
          boxShadow: 3,
          '&:hover': {
            boxShadow: 6
          }
        }}
      >
        Dev MODE
      </Button>

      {/* Dev Mode Popup */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#232323',
            color: '#fff',
            border: '2px solid #ff9800'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid #444'
        }}>
          <Box display="flex" alignItems="center">
            <WarningIcon sx={{ color: '#ff9800', mr: 1 }} />
            <Typography variant="h6" color="warning.main">
              Development Mode
            </Typography>
            <Chip 
              label="DEV ONLY" 
              size="small" 
              color="warning" 
              sx={{ ml: 1 }}
            />
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{ color: '#fff' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            Switch between local development and MongoDB production data sources.
          </Alert>

          {/* Data Source Toggle */}
          <Box display="flex" alignItems="center" mb={3}>
            <ComputerIcon sx={{ mr: 1, color: dataSource === 'local' ? 'primary.main' : 'grey.500' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={dataSource === 'local'}
                  onChange={handleDataSourceChange}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body1">
                    {dataSource === 'local' ? 'Local Development' : 'MongoDB Production'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {dataSource === 'local' 
                      ? 'Working with local TypeScript files' 
                      : 'Connected to MongoDB database'
                    }
                  </Typography>
                </Box>
              }
            />
            <StorageIcon sx={{ ml: 1, color: dataSource === 'mongodb' ? 'primary.main' : 'grey.500' }} />
          </Box>

                        {dataSource === 'local' && (
                <>
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Master List Selection: (Debug: {masterLists.length} files found)
                  </Typography>
                  
                  {masterLists.length === 0 ? (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        No master list files found. Loading... (Check console for debug info)
                      </Typography>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        onClick={() => window.location.reload()}
                      >
                        Refresh Page
                      </Button>
                    </Box>
                  ) : (
                    <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                      {masterLists.map((file) => (
                        <Chip
                          key={file.name}
                          label={file.displayName}
                          onClick={() => setSelectedMasterList(file.name)}
                          color={selectedMasterList === file.name ? 'primary' : 'default'}
                          variant={selectedMasterList === file.name ? 'filled' : 'outlined'}
                          size="small"
                        />
                      ))}
                    </Box>
                  )}

              {selectedFile && (
                <Box mb={2}>
                  <Typography variant="caption" color="text.secondary">
                    Last modified: {new Date(selectedFile.lastModified).toLocaleString()}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Backup Management */}
              <Typography variant="subtitle2" gutterBottom>
                Backup Management:
              </Typography>
              
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<BackupIcon />}
                  onClick={() => {
                    onCreateBackup?.();
                    handleClose();
                  }}
                  title="Create a backup of the current master list"
                >
                  Create Backup
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                  onClick={() => setShowBackups(!showBackups)}
                  title="View available backups"
                >
                  {showBackups ? 'Hide Backups' : 'View Backups'} ({backups.length})
                </Button>

                {showBackups && backups.length > 0 && (
                  <Box sx={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #444', borderRadius: 1, p: 1 }}>
                    {backups.map((backup) => (
                      <Box key={backup.name} sx={{ mb: 1, p: 1, border: '1px solid #333', borderRadius: 1 }}>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {backup.metadata ? `${backup.metadata.date} ${backup.metadata.time} (${backup.metadata.nodeCount} nodes)` : backup.name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {backup.name}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            onRestoreFromBackup?.(backup.name);
                            handleClose();
                          }}
                          title="Restore from this backup"
                        >
                          Restore
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}

                {showBackups && backups.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No backups found
                  </Typography>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Data Conversion */}
              <Typography variant="subtitle2" gutterBottom>
                Data Conversion:
              </Typography>
              
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                  onClick={() => {
                    onConvertToMongo?.();
                    handleClose();
                  }}
                  title="Convert current local data to MongoDB format"
                >
                  Convert to MongoDB
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<StorageIcon />}
                  onClick={() => {
                    onSeedFromLocal?.();
                    handleClose();
                  }}
                  title="Seed MongoDB with current local data"
                >
                  Seed MongoDB
                </Button>
              </Box>
            </>
          )}

          {dataSource === 'mongodb' && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Connected to MongoDB. Switch to local mode for development.
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: '1px solid #444' }}>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 