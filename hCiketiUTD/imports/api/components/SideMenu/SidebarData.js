import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Session Setup',
    path: '/sessionsetup',
    icon: <FiIcons.FiClock />,
    cName: 'nav-text'
  },
  {
    title: 'Scheduled Sessions',
    path: '/scheduledsessions',
    icon: <GiIcons.GiVideoConference />,
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
   }//,
//   {
//     title: 'Log Out',
//     path: '/login',
//     icon: <FiIcons.FiLogOut />,
//     cName: 'nav-text'
//   }
];