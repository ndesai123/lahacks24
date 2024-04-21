import React, { useState } from 'react';
import "./resources.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';

const Resources = () => {
  return (
    <div>
      <div>
          <div className='titleResources'>
            <p className='titleTextRe'>Resources.</p>
          </div>
          <div class="resourcesList">
            <p class="p1">National Suicide Prevention Lifeline: 1-800-273-TALK (1-800-273-8255)</p>
            <p class="p1">Crisis Text Line: Text HOME to 741741 (in the United States)</p>
            <p class="p1">National Institute of Mental Health (NIMH): 1-866-615-6464</p>
            <p class="p1">National Alliance on Mental Illness (NAMI): 1-800-950-6264</p>
            <p class="p1">Mental Health America: 1-800-273-TALK (1-800-273-8255)</p>
            <p class="p1">Remember, these resources are here to support you, whether you're seeking immediate assistance during a crisis or looking for ongoing mental health care.</p>
          </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Resources