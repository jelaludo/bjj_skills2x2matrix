import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  CircularProgress
} from '@mui/material';
import {
  Storage as StorageIcon,
  Computer as ComputerIcon,
  CloudUpload as CloudUploadIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  Backup as BackupIcon,
  Article as ArticleIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

interface DevModeToggleProps {
  isDevelopment: boolean;
  dataSource: 'mongodb' | 'local' | 'production';
  setDataSource: (source: 'mongodb' | 'local' | 'production') => void;
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
  onCreateArticle?: (pdfFile: File, articleTitle: string) => Promise<void>;
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
  onRestoreFromBackup,
  onCreateArticle
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
  const [showPdfCreator, setShowPdfCreator] = useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isDevelopment) {
    return null;
  }

  const handleDataSourceChange = (newSource: 'mongodb' | 'local' | 'production') => {
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdfFile(file);
      setArticleTitle(file.name.replace('.pdf', ''));
      setExtractedText('');
    }
  };

  const handleExtractPdf = async () => {
    if (!selectedPdfFile) return;

    setIsCreatingArticle(true);
    try {
      const formData = new FormData();
      formData.append('pdf', selectedPdfFile);

      const response = await fetch('http://localhost:3001/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setExtractedText(data.text);
      } else {
        console.error('Failed to extract PDF text');
        setExtractedText('Failed to extract PDF text. Please try again.');
      }
    } catch (error) {
      console.error('Error extracting PDF:', error);
      setExtractedText('Error extracting PDF text. Please try again.');
    } finally {
      setIsCreatingArticle(false);
    }
  };

  const handleCreateArticle = async () => {
    if (!selectedPdfFile || !articleTitle.trim() || !extractedText) return;

    setIsCreatingArticle(true);
    try {
      await onCreateArticle?.(selectedPdfFile, articleTitle);
      setSelectedPdfFile(null);
      setArticleTitle('');
      setExtractedText('');
      setShowPdfCreator(false);
    } catch (error) {
      console.error('Error creating article:', error);
    } finally {
      setIsCreatingArticle(false);
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
            Choose your data source for development and testing.
          </Alert>

          {/* Data Source Selection */}
          <Typography variant="subtitle2" gutterBottom>
            Data Source:
          </Typography>
          
          <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
            <Chip
              label="MongoDB"
              onClick={() => handleDataSourceChange('mongodb')}
              color={dataSource === 'mongodb' ? 'primary' : 'default'}
              variant={dataSource === 'mongodb' ? 'filled' : 'outlined'}
              icon={<StorageIcon />}
            />
            <Chip
              label="Local Files"
              onClick={() => handleDataSourceChange('local')}
              color={dataSource === 'local' ? 'primary' : 'default'}
              variant={dataSource === 'local' ? 'filled' : 'outlined'}
              icon={<ComputerIcon />}
            />
            <Chip
              label="Production Data"
              onClick={() => handleDataSourceChange('production')}
              color={dataSource === 'production' ? 'primary' : 'default'}
              variant={dataSource === 'production' ? 'filled' : 'outlined'}
              icon={<CloudUploadIcon />}
            />
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
            {dataSource === 'mongodb' && 'Connected to MongoDB database'}
            {dataSource === 'local' && 'Working with local TypeScript files'}
            {dataSource === 'production' && 'Using bundled production data'}
          </Typography>

                        {(dataSource === 'local' || dataSource === 'production') && (
                <>
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
                    </>
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
                      title={dataSource === 'production' ? "Create a backup of the current production data" : "Create a backup of the current master list"}
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

                  {dataSource === 'local' && (
                    <>
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

                  <Divider sx={{ my: 2 }} />

                  {/* PDF Article Creator */}
                  <Typography variant="subtitle2" gutterBottom>
                    PDF Article Creator:
                  </Typography>
                  
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<ArticleIcon />}
                      onClick={() => setShowPdfCreator(!showPdfCreator)}
                      title="Create articles from PDF files"
                    >
                      {showPdfCreator ? 'Hide PDF Creator' : 'PDF Article Creator'}
                    </Button>

                    {showPdfCreator && (
                      <Box sx={{ border: '1px solid #444', borderRadius: 1, p: 2 }}>
                        {/* File Selection */}
                        <Typography variant="body2" gutterBottom>
                          Select PDF File:
                        </Typography>
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf"
                          onChange={handleFileSelect}
                          style={{ display: 'none' }}
                        />
                        
                        <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<DescriptionIcon />}
                          onClick={() => fileInputRef.current?.click()}
                          sx={{ mb: 2 }}
                        >
                          {selectedPdfFile ? selectedPdfFile.name : 'Choose PDF File'}
                        </Button>

                        {selectedPdfFile && (
                          <>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                              File: {selectedPdfFile.name} ({(selectedPdfFile.size / 1024 / 1024).toFixed(2)} MB)
                            </Typography>

                            {/* Article Title */}
                            <TextField
                              label="Article Title"
                              value={articleTitle}
                              onChange={(e) => setArticleTitle(e.target.value)}
                              fullWidth
                              size="small"
                              sx={{ mb: 2 }}
                            />

                            {/* Extract Button */}
                            <Button
                              variant="contained"
                              fullWidth
                              onClick={handleExtractPdf}
                              disabled={isCreatingArticle}
                              startIcon={isCreatingArticle ? <CircularProgress size={16} /> : <DescriptionIcon />}
                              sx={{ mb: 2 }}
                            >
                              {isCreatingArticle ? 'Extracting...' : 'Extract PDF Text'}
                            </Button>

                            {/* Extracted Text Preview */}
                            {extractedText && (
                              <>
                                <Typography variant="body2" gutterBottom>
                                  Extracted Text Preview:
                                </Typography>
                                <Box
                                  sx={{
                                    maxHeight: 150,
                                    overflowY: 'auto',
                                    border: '1px solid #333',
                                    borderRadius: 1,
                                    p: 1,
                                    mb: 2,
                                    fontSize: '12px',
                                    fontFamily: 'monospace',
                                    backgroundColor: '#1a1a1a'
                                  }}
                                >
                                  {extractedText.substring(0, 500)}
                                  {extractedText.length > 500 && '...'}
                                </Box>

                                {/* Create Article Button */}
                                <Button
                                  variant="contained"
                                  color="primary"
                                  fullWidth
                                  onClick={handleCreateArticle}
                                  disabled={isCreatingArticle || !articleTitle.trim()}
                                  startIcon={isCreatingArticle ? <CircularProgress size={16} /> : <ArticleIcon />}
                                >
                                  {isCreatingArticle ? 'Creating Article...' : 'Create Article'}
                                </Button>
                              </>
                            )}
                          </>
                        )}
                      </Box>
                    )}
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
