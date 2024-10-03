import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import AuthProviders from './Providers/AuthProviders';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <div className='px-2'>
   <AuthProviders>
    <QueryClientProvider client={queryClient}>
    <div className='container mx-auto'>
    <RouterProvider router={router}/>
    </div>  
    </QueryClientProvider>
    </AuthProviders>
   </div>
  </React.StrictMode>,
)
