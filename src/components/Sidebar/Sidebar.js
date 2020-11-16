import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  border-right: 1px solid white;
  align-items: center;
  text-align: center;
  background-color: ${(props) => props.theme.back_color};
  width: 20%;
`;

const SidebarWelcome = styled.div`
  color: white;
  padding-top: 2%;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarWelcome>Manage your library!</SidebarWelcome>
      <div>We are here to help, ahahah</div>
      <div>We are here to help, ahahah</div>
      <div>We are here to help, ahahah</div>
    </SidebarContainer>
  );
};

export default Sidebar;
