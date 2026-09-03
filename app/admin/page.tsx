// import { createClient } from '@/utils/supabase/server';
// import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  // const supabase = await createClient();
  // const { data: { session } } = await supabase.auth.getSession();
  // 
  // if (!session) {
  //   redirect('/admin/login');
  // }
  // 
  // const { data: orders, error } = await supabase
  //   .from('orders')
  //   .select('*')
  //   .order('created_at', { ascending: false });

  // Mock data for previewing without Supabase
  const orders: { id: string; created_at: string; buyer_name: string; buyer_email: string; buyer_phone: string; amount: number; payment_status: string; fulfillment_status: string; }[] = [
    {
      id: '1',
      created_at: '2026-09-03T10:00:00Z',
      buyer_name: 'John Doe',
      buyer_email: 'john@example.com',
      buyer_phone: '+233 24 123 4567',
      amount: 150.00,
      payment_status: 'paid',
      fulfillment_status: 'pending'
    },
    {
      id: '2',
      created_at: '2026-09-02T10:00:00Z',
      buyer_name: 'Jane Smith',
      buyer_email: 'jane@example.com',
      buyer_phone: '+233 20 987 6543',
      amount: 450.00,
      payment_status: 'paid',
      fulfillment_status: 'processing'
    },
    {
      id: '3',
      created_at: '2026-09-01T10:00:00Z',
      buyer_name: 'Kwame Mensah',
      buyer_email: 'kwame@example.com',
      buyer_phone: '+233 27 555 1234',
      amount: 450.00,
      payment_status: 'paid',
      fulfillment_status: 'shipped'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
      
      {orders?.length === 0 ? (
        <div className="bg-white p-8 rounded border border-gray-200 text-center text-gray-500">
          No orders found yet.
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders?.map((order) => (
                  <tr key={order.id} className="text-sm">
                    <td className="p-4 text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="p-4 font-medium text-gray-900">{order.buyer_name}</td>
                    <td className="p-4">
                      <div className="text-gray-900">{order.buyer_email}</div>
                      <div className="text-gray-500 text-xs">{order.buyer_phone}</div>
                    </td>
                    <td className="p-4 text-gray-900">GHS {order.amount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.payment_status}
                      </span>
                      <div className="mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.fulfillment_status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.fulfillment_status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <form action={`/api/orders/${order.id}/ship`} method="post">
                        <button 
                          disabled={order.fulfillment_status === 'shipped'}
                          className="text-[var(--color-primary)] hover:underline disabled:opacity-50 disabled:no-underline text-sm font-medium"
                        >
                          Mark Shipped
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
