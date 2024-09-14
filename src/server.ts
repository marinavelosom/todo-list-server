import app from './app';
import createMembersTable from './migrations/createTableMembers';

const port = process.env.PORT || 5000;

createMembersTable();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
