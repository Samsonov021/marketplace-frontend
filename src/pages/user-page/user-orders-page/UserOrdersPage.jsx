import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrders } from "../../../store/authActions";
import ProfileLayout from "../../../layouts/profile-layout/ProfileLayout";
import cl from "./UserOrdersPage.module.css";
import { orderCancellation } from "../../../api/users.api";

const UserOrdersPage = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.auth);
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        if (orders.length === 0) {
            dispatch(loadOrders());
        }
    }, [dispatch, orders]);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    const getOrderStatus = (status) => {
        const statusMap = {
            pending: { class: cl.pending, text: "В пути" },
            delivered: { class: cl.delivered, text: "Доставлен" },
            cancelled: { class: cl.canceled, text: "Отменен" },
        };

        return statusMap[status] || { class: "", text: status };
    };

    const handleOrderCancellation = async (orderId) => {
        try {
            await orderCancellation(orderId);
            dispatch(loadOrders());
        } catch (error) {
            console.error("Не удалось отменить заказ:", error);
        }
    };

    const filteredOrders = selectedStatus
        ? orders.filter((order) => order.status === selectedStatus)
        : orders;

        return (
            <ProfileLayout>
                <div className={cl.pageContainer}>
                    <div className={cl.header}>
                        <div className={cl.statusFilters}>
                            <button
                                className={selectedStatus === null ? cl.active : ""}
                                onClick={() => setSelectedStatus(null)}
                            >
                                Все
                            </button>
                            <button
                                className={selectedStatus === "pending" ? cl.active : ""}
                                onClick={() => setSelectedStatus("pending")}
                            >
                                В пути
                            </button>
                            <button
                                className={selectedStatus === "delivered" ? cl.active : ""}
                                onClick={() => setSelectedStatus("delivered")}
                            >
                                Завершенные
                            </button>
                            <button
                                className={selectedStatus === "cancelled" ? cl.active : ""}
                                onClick={() => setSelectedStatus("cancelled")}
                            >
                                Отмененные
                            </button>
                        </div>
                    </div>
    
                    <div className={cl.orderContainer}>
                        {filteredOrders.length === 0 ? (
                            <p>У вас пока нет заказов.</p>
                        ) : (
                            filteredOrders.map((order) => (
                                <div key={order.id} className={cl.orderCard}>
                                    <div className={cl.orderHeader}>
                                        <div className={cl.orderInfo}>
                                            <h3>Заказ №{order.id}</h3>
                                            <span className={`${cl.orderStatus} ${getOrderStatus(order.status).class}`}>
                                                {getOrderStatus(order.status).text}
                                            </span>
                                        </div>
                                        <p className={cl.orderTotal}>
                                            <strong>Общая стоимость:</strong> {order.totalPrice} руб.
                                        </p>
                                    </div>
                                    <div className={cl.orderItems}>
                                        {order.orderItems && order.orderItems.length > 0 ? (
                                            order.orderItems.map((item) => (
                                                <div key={item.id} className={cl.orderItem}>
                                                    <img
                                                        src={item.product.photo}
                                                        alt={item.product.name}
                                                    />
                                                    <div>
                                                        <p><strong>Цена:</strong> {item.product.price} руб.</p>
                                                        <p><strong>Количество:</strong> {item.quantity}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Нет товаров в этом заказе.</p>
                                        )}
                                    </div>
                                    {order.status === "pending" && (
                                        <div
                                            className={cl.cancel__button}
                                            onClick={() => handleOrderCancellation(order.id)}
                                        >
                                            Отменить заказ
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </ProfileLayout>
        );
    };
    
    export default UserOrdersPage;
