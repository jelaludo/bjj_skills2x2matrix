import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import versionInfo from '../versionInfo.json';

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}

export const HelpDialog: React.FC<HelpDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#1a1a1a',
          color: '#fff',
          border: '1px solid #333'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid #333',
        pb: 2
      }}>
        <Typography variant="h5" component="div">
          Why this Grappling Skills Matrix?
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          <em>All models are wrong, but some are useful.</em>
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          When I started BJJ, I wasn't just interested in collecting techniques. I was looking for the why, the underlying concepts that make it all work.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          Early on, Ryan Hall was one of the only people speaking in terms of principles. Years later, The 21 Immutable Principles of BJJ came out, by Paulo Guillobel. I found it compelling-yet-arbitrary. Why 21? Why not 5? Or 238? Sure enough, other lists followed: 30 Principles for Beginners, Four Key Principles, 32 Principles, and so on.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          Some schools boil it down to three: Flow, Pressure, Finish (Ribeiro/Lovato). Danaher has his 4-steps model, but could probably produced hundreds of principles and models if we were to pick his brain or analyze all his material. Kano Jigoro would maybe say there's really only one: Kuzushi. If you could keep your opponent in constant imbalance, what more would you need?
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          But that brings us to the real question: How do you do that?
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          You're told to master the fundamentals. But what are they? Shrimping? Armbars? Mount escapes? Those are techniques. I was after something more foundational.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          I started digging toward what I now call Grappling Primitives—the irreducible building blocks that all techniques rely on. Just like cryptographic primitives (e.g., private keys, hash functions) or mathematical ones (e.g., addition, set membership), these are the smallest conceptual units that can't be broken down further.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          Take an armbar: it's built from leverage, a fulcrum, control of the joint above, and shearing forces. These are the primitives. Others include: Wedges, Frames, Joint Slack, Proprioception, Form Tension, Fascia Activation maybe?, Back-Heeling...
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          I toyed with calling them "memes" in the original Richard Dawkins sense—units of idea transmission. But yeah, that word's been hijacked by cats and badly compressed jpegs. So I went with "primitives", because the double-entendre makes me smile. From the Latin primitivus: "first of its kind." It's fitting, especially since many of us on the mats still behave like grunting primitives in the other sense.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          To organize these ideas, I built an interactive 2x2 matrix; a visual framework to help map Grappling Primitives by category, mostly self vs. opponent, and mental vs physical. It's been a huge help in my own path to black belt, and in coaching. Once these ideas are in your mental toolkit, you start seeing them in action, noticing when they're missing in your students, noticing when they appear in the wild in seemingly disparate techniques.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          Of course, take it all with a grain of salt.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          <em>All models are wrong. Some are useful.</em>
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3 }}>
          I hope this one proves useful to you.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 4 }}>
          Cheers,<br />
          Jelaludo
        </Typography>

        <Divider sx={{ my: 3, borderColor: '#333' }} />

        {/* Version Info */}
        <Box sx={{ textAlign: 'center', color: '#888' }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
            BJJ Skill Matrix v{versionInfo.version}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
            {versionInfo.gitHash} | "{versionInfo.commitMessage}"
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            {versionInfo.branch} | {versionInfo.fullBuildInfo}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid #333' }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#fff', borderColor: '#666' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 