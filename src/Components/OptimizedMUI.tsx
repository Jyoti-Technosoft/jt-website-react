// Optimized Material-UI component wrapper
// This file provides tree-shaken Material-UI components to reduce bundle size

import React, { lazy, Suspense } from 'react';

// Lazy load Material-UI components for better code splitting
export const Box = lazy(() => import('@mui/material/Box'));
export const Typography = lazy(() => import('@mui/material/Typography'));
export const Button = lazy(() => import('@mui/material/Button'));
export const Container = lazy(() => import('@mui/material/Container'));
export const Grid = lazy(() => import('@mui/material/Grid'));
export const Paper = lazy(() => import('@mui/material/Paper'));
export const Card = lazy(() => import('@mui/material/Card'));
export const CardContent = lazy(() => import('@mui/material/CardContent'));
export const CardActions = lazy(() => import('@mui/material/CardActions'));
export const TextField = lazy(() => import('@mui/material/TextField'));
export const Select = lazy(() => import('@mui/material/Select'));
export const MenuItem = lazy(() => import('@mui/material/MenuItem'));
export const FormControl = lazy(() => import('@mui/material/FormControl'));
export const InputLabel = lazy(() => import('@mui/material/InputLabel'));
export const AppBar = lazy(() => import('@mui/material/AppBar'));
export const Toolbar = lazy(() => import('@mui/material/Toolbar'));
export const Drawer = lazy(() => import('@mui/material/Drawer'));
export const List = lazy(() => import('@mui/material/List'));
export const ListItem = lazy(() => import('@mui/material/ListItem'));
export const ListItemText = lazy(() => import('@mui/material/ListItemText'));
export const ListItemIcon = lazy(() => import('@mui/material/ListItemIcon'));
export const Divider = lazy(() => import('@mui/material/Divider'));
export const Stack = lazy(() => import('@mui/material/Stack'));
export const Chip = lazy(() => import('@mui/material/Chip'));
export const Avatar = lazy(() => import('@mui/material/Avatar'));
export const CircularProgress = lazy(() => import('@mui/material/CircularProgress'));
export const Skeleton = lazy(() => import('@mui/material/Skeleton'));
export const Alert = lazy(() => import('@mui/material/Alert'));
export const Snackbar = lazy(() => import('@mui/material/Snackbar'));

// Lazy load Material-UI icons
export const MenuIcon = lazy(() => import('@mui/icons-material/Menu'));
export const CloseIcon = lazy(() => import('@mui/icons-material/Close'));
export const ArrowBackIcon = lazy(() => import('@mui/icons-material/ArrowBack'));
export const ArrowForwardIcon = lazy(() => import('@mui/icons-material/ArrowForward'));
export const HomeIcon = lazy(() => import('@mui/icons-material/Home'));
export const SearchIcon = lazy(() => import('@mui/icons-material/Search'));
export const EditIcon = lazy(() => import('@mui/icons-material/Edit'));
export const DeleteIcon = lazy(() => import('@mui/icons-material/Delete'));
export const AddIcon = lazy(() => import('@mui/icons-material/Add'));
export const SaveIcon = lazy(() => import('@mui/icons-material/Save'));
export const CancelIcon = lazy(() => import('@mui/icons-material/Cancel'));
export const RefreshIcon = lazy(() => import('@mui/icons-material/Refresh'));
export const EmailIcon = lazy(() => import('@mui/icons-material/Email'));
export const PhoneIcon = lazy(() => import('@mui/icons-material/Phone'));
export const LocationOnIcon = lazy(() => import('@mui/icons-material/LocationOn'));
export const ShareIcon = lazy(() => import('@mui/icons-material/Share'));
export const MessageIcon = lazy(() => import('@mui/icons-material/Message'));
export const FacebookIcon = lazy(() => import('@mui/icons-material/Facebook'));
export const TwitterIcon = lazy(() => import('@mui/icons-material/Twitter'));
export const LinkedInIcon = lazy(() => import('@mui/icons-material/LinkedIn'));
export const InstagramIcon = lazy(() => import('@mui/icons-material/Instagram'));
export const YouTubeIcon = lazy(() => import('@mui/icons-material/YouTube'));
export const CodeIcon = lazy(() => import('@mui/icons-material/Code'));
export const WebIcon = lazy(() => import('@mui/icons-material/Web'));
export const SmartphoneIcon = lazy(() => import('@mui/icons-material/Smartphone'));
export const ComputerIcon = lazy(() => import('@mui/icons-material/Computer'));
export const CloudIcon = lazy(() => import('@mui/icons-material/Cloud'));
export const SecurityIcon = lazy(() => import('@mui/icons-material/Security'));

// Higher-order component for wrapping with Suspense
export const withSuspense = <P extends object>(
  Component: React.ComponentType<P>,
  fallback: React.ReactNode = <div>Loading...</div>
) => {
  return (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

// Pre-configured components with Suspense
export const SuspenseBox = withSuspense(Box);
export const SuspenseTypography = withSuspense(Typography);
export const SuspenseButton = withSuspense(Button);
export const SuspenseContainer = withSuspense(Container);
export const SuspenseGrid = withSuspense(Grid);
export const SuspensePaper = withSuspense(Paper);
export const SuspenseCard = withSuspense(Card);
export const SuspenseCardContent = withSuspense(CardContent);
export const SuspenseCardActions = withSuspense(CardActions);
export const SuspenseTextField = withSuspense(TextField);
export const SuspenseSelect = withSuspense(Select);
export const SuspenseMenuItem = withSuspense(MenuItem);
export const SuspenseFormControl = withSuspense(FormControl);
export const SuspenseInputLabel = withSuspense(InputLabel);
export const SuspenseAppBar = withSuspense(AppBar);
export const SuspenseToolbar = withSuspense(Toolbar);
export const SuspenseDrawer = withSuspense(Drawer);
export const SuspenseList = withSuspense(List);
export const SuspenseListItem = withSuspense(ListItem);
export const SuspenseListItemText = withSuspense(ListItemText);
export const SuspenseListItemIcon = withSuspense(ListItemIcon);
export const SuspenseDivider = withSuspense(Divider);
export const SuspenseStack = withSuspense(Stack);
export const SuspenseChip = withSuspense(Chip);
export const SuspenseAvatar = withSuspense(Avatar);
export const SuspenseCircularProgress = withSuspense(CircularProgress);
export const SuspenseSkeleton = withSuspense(Skeleton);
export const SuspenseAlert = withSuspense(Alert);
export const SuspenseSnackbar = withSuspense(Snackbar);

// Icon components with Suspense
export const SuspenseMenuIcon = withSuspense(MenuIcon);
export const SuspenseCloseIcon = withSuspense(CloseIcon);
export const SuspenseArrowBackIcon = withSuspense(ArrowBackIcon);
export const SuspenseArrowForwardIcon = withSuspense(ArrowForwardIcon);
export const SuspenseHomeIcon = withSuspense(HomeIcon);
export const SuspenseSearchIcon = withSuspense(SearchIcon);
export const SuspenseEditIcon = withSuspense(EditIcon);
export const SuspenseDeleteIcon = withSuspense(DeleteIcon);
export const SuspenseAddIcon = withSuspense(AddIcon);
export const SuspenseSaveIcon = withSuspense(SaveIcon);
export const SuspenseCancelIcon = withSuspense(CancelIcon);
export const SuspenseRefreshIcon = withSuspense(RefreshIcon);
export const SuspenseEmailIcon = withSuspense(EmailIcon);
export const SuspensePhoneIcon = withSuspense(PhoneIcon);
export const SuspenseLocationOnIcon = withSuspense(LocationOnIcon);
export const SuspenseShareIcon = withSuspense(ShareIcon);
export const SuspenseMessageIcon = withSuspense(MessageIcon);
export const SuspenseFacebookIcon = withSuspense(FacebookIcon);
export const SuspenseTwitterIcon = withSuspense(TwitterIcon);
export const SuspenseLinkedInIcon = withSuspense(LinkedInIcon);
export const SuspenseInstagramIcon = withSuspense(InstagramIcon);
export const SuspenseYouTubeIcon = withSuspense(YouTubeIcon);
export const SuspenseCodeIcon = withSuspense(CodeIcon);
export const SuspenseWebIcon = withSuspense(WebIcon);
export const SuspenseSmartphoneIcon = withSuspense(SmartphoneIcon);
export const SuspenseComputerIcon = withSuspense(ComputerIcon);
export const SuspenseCloudIcon = withSuspense(CloudIcon);
export const SuspenseSecurityIcon = withSuspense(SecurityIcon);

export default {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Stack,
  Chip,
  Avatar,
  CircularProgress,
  Skeleton,
  Alert,
  Snackbar,
  // Icons
  MenuIcon,
  CloseIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  HomeIcon,
  SearchIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
  SaveIcon,
  CancelIcon,
  RefreshIcon,
  EmailIcon,
  PhoneIcon,
  LocationOnIcon,
  ShareIcon,
  MessageIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
  CodeIcon,
  WebIcon,
  SmartphoneIcon,
  ComputerIcon,
  CloudIcon,
  SecurityIcon,
};
