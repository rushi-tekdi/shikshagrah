'use client';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Layout } from '@shared-lib';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Grid from '@mui/material/Grid2';
import CommonCollapse from '../components/CommonCollapse';
import { useRouter } from 'next/navigation'; // Use Next.js router

interface DetailsProps {
  details: any;
}

export default function Details({ details }: DetailsProps) {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter(); // Next.js router

  const handleAccountClick = () => {
    console.log('Account clicked');
  };

  const handleMenuClick = () => {
    console.log('Menu icon clicked');
  };

  const handleSearchClick = () => {
    console.log('Search button clicked');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const renderNestedChildren = (children: any) => {
    if (!Array.isArray(children)) {
      return null;
    }
    return children?.map((item: any) => (
      <CommonCollapse
        key={item.id}
        id={item.identifier}
        identifier={item.identifier}
        title={item.name}
        data={item?.children}
        content={
          item.children?.length > 0 ? renderNestedChildren(item.children) : []
        }
        status="Completed"
        showIcon
        icon={<CheckCircleIcon sx={{ color: 'green' }} />}
        defaultExpanded={item.defaultExpanded}
      />
    ));
  };

  return (
    <Layout
      showTopAppBar={{
        title: 'Content Details',
        showMenuIcon: true,
        menuIconClick: handleMenuClick,
        actionButtonLabel: 'Action',
        actionIcons: [
          {
            icon: <AccountCircleIcon />,
            ariaLabel: 'Account',
            onClick: handleAccountClick,
          },
        ],
      }}
      showSearch={{
        placeholder: 'Search content..',
        rightIcon: <SearchIcon />,
        inputValue: searchValue,
        onInputChange: handleSearchChange,
        onRightIconClick: handleSearchClick,
        sx: {
          backgroundColor: '#f0f0f0',
          padding: '4px',
          borderRadius: '50px',
          width: '100%',
        },
      }}
      isFooter={false}
      showLogo={true}
      showBack={true}
      sx={{ height: '0vh' }}
    >
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid fontSize={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ marginTop: '10px', fontWeight: 'bold' }}
            >
              {details?.name}
            </Typography>

            <ul>
              <li>
                Board:{' '}
                {details?.targetBoardIds
                  ?.map((boardId: any) => boardId)
                  .join(', ')}
              </li>
              <li>Class: {details?.se_gradeLevels?.join(', ')}</li>
              <li>Subject: {details?.subject || ''}</li>
            </ul>
          </Grid>
        </Grid>

        {details?.children?.length > 0 &&
          renderNestedChildren(details.children)}
      </Box>
    </Layout>
  );
}
