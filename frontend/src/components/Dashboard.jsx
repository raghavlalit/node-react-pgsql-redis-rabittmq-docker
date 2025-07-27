import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full py-6">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                User Profile
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.role}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">User ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.id}</dd>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Protected Content
              </h2>
              <p className="text-sm text-gray-600">
                This content is only visible to authenticated users. You can now access all the features of the event booking application.
              </p>
              
              {user?.role === 'ADMIN' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="text-sm font-medium text-yellow-800">Admin Access</h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    You have administrator privileges. You can manage events, users, and system settings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 