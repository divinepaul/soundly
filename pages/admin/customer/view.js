import AdminLayout from "@/components/admin_layout";
import db from "@/db";

export async function getServerSideProps(context) {

    let customers = await db.select("*")
        .from("tbl_customer")
        .innerJoin("tbl_login", "tbl_customer.email", "tbl_login.email");
    customers = JSON.parse(JSON.stringify(customers));

    return {
        props: { customers }, // will be passed to the page component as props
    }
}

export default function AdminCustomerView(props) {
    return (
        <AdminLayout>
            <h1>Customers</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Customer id</th>
                        <th>Customer email</th>
                        <th>Customer name</th>
                        <th>Customer phone</th>
                        <th>Edit</th>
                        <th>Status</th>
                    </tr>

                    {
                        props.customers.map((customer) => (
                            <tr key={customer.customer_id}>
                                <td>{customer.customer_id}</td>
                                <td>{customer.email}</td>
                                <td>{customer.customer_name}</td>
                                <td>{customer.customer_phone}</td>
                                <td>{customer.status ? "active" : "inactive"}</td>
                                <td>
                                    <a href={"/admin/customer/" + customer.customer_id}>Edit</a>
                                </td>
                                <td>
                                    <a href={"/api/customer/" + customer.email}>Delete</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    );
}
