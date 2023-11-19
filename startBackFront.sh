#!/bin/bash
cd backend && npm run startExperimental &
cd frontend && npm run startExperimental &
wait