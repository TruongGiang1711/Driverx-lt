import React, { useState, useEffect } from 'react'
import { getMe } from 'src/services/usersService';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
  const [me, setMe] = useState([]);
  useEffect(() => {
    async function fetchMe() {
      try {
        const me = await getMe();
        setMe(me.data);
      } catch (error) {
      }
    }
    fetchMe();
  }, []);
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader dataMe={me} />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
