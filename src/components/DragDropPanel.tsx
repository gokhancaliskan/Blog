import React, { useState, useEffect } from "react";
import styles from "../styles/panel.module.css";

interface Product {
  _id: string;
  title: string;
  main: string;
  category: string;
  image: string;
  content: string;
  price: string;
}

interface DragDropPanelProps {
  main: string[];
  categories: { [key: string]: string[] };
  products: { [key: string]: Product[] };
}

const DragDropPanel: React.FC = () => {
  const [data, setData] = useState<DragDropPanelProps>({
    main: [],
    categories: {},
    products: {},
  });

  const [selectedMain, setSelectedMain] = useState<
    string | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<
    string | null
  >(null);
  const [selectedItem, setSelectedItem] =
    useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/posts");
      const postsData: Product[] = await response.json();

      const main = Array.from(
        new Set(postsData.map((post) => post.main))
      );
      const categories: { [key: string]: string[] } = {};
      const products: { [key: string]: Product[] } = {};

      main.forEach((m) => {
        const mainCategories = Array.from(
          new Set(
            postsData
              .filter((post) => post.main === m)
              .map((post) => post.category)
          )
        );
        categories[m] = mainCategories
          .filter((c) => c)
          .map((c) => String(c));

        if (!categories[m].length) {
          products[m] = postsData.filter(
            (post) => post.main === m
          );
        } else {
          categories[m].forEach((c) => {
            products[c] = postsData.filter(
              (post) => post.category === c
            );
          });
        }
      });

      setData({
        main,
        categories,
        products,
      });
    };

    fetchData();
  }, []);

  const handleItemClick = async (item: Product) => {
    if (selectedItem) {
      // İki öğeyi değiştir
      const updatedSelectedItem = {
        ...selectedItem,
        ...item,
        _id: selectedItem._id,
      };
      const updatedClickedItem = {
        ...item,
        ...selectedItem,
        _id: item._id,
      };

      // Veritabanını güncelle
      await updateItemInDatabase(updatedSelectedItem);
      await updateItemInDatabase(updatedClickedItem);

      // Durumu güncelle
      setData((prev) => {
        const newProducts = { ...prev.products };
        if (selectedCategory) {
          newProducts[selectedCategory] = newProducts[
            selectedCategory
          ].map((prod) =>
            prod._id === updatedSelectedItem._id
              ? updatedSelectedItem
              : prod._id === updatedClickedItem._id
              ? updatedClickedItem
              : prod
          );
        } else if (selectedMain) {
          newProducts[selectedMain] = newProducts[
            selectedMain
          ].map((prod) =>
            prod._id === updatedSelectedItem._id
              ? updatedSelectedItem
              : prod._id === updatedClickedItem._id
              ? updatedClickedItem
              : prod
          );
        }
        return {
          ...prev,
          products: newProducts,
        };
      });

      // Seçimi sıfırla
      setSelectedItem(null);
    } else {
      // İlk öğeyi seç
      setSelectedItem(item);
    }
  };

  const updateItemInDatabase = async (item: Product) => {
    const response = await fetch(
      `/api/updateItem?id=${item._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    const data = await response.json();
    console.log("Updated item:", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.droppableContainer}>
        <h3>Main</h3>
        {data.main.map((mainItem, index) => (
          <div
            key={mainItem}
            className={styles.draggableItem}
            onClick={() => {
              setSelectedMain(mainItem);
              setSelectedCategory(null);
            }}
          >
            {mainItem}
          </div>
        ))}
      </div>

      {selectedMain &&
        data.categories[selectedMain] &&
        data.categories[selectedMain].length > 0 && (
          <div className={styles.droppableContainer}>
            <h3>Categories</h3>
            {data.categories[selectedMain].map(
              (category, index) => (
                <div
                  key={category}
                  className={styles.draggableItem}
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                >
                  {category}
                </div>
              )
            )}
          </div>
        )}

      {selectedMain &&
        (!data.categories[selectedMain] ||
          data.categories[selectedMain].length === 0) && (
          <div className={styles.droppableContainer}>
            <h3>Products</h3>
            {(data.products[selectedMain] || []).map(
              (product) => (
                <div
                  key={product._id}
                  className={`${styles.draggableItem} ${
                    selectedItem?._id === product._id
                      ? styles.selectedItem
                      : ""
                  }`}
                  onClick={() => handleItemClick(product)}
                >
                  {product.title}
                </div>
              )
            )}
          </div>
        )}

      {selectedCategory && (
        <div className={styles.droppableContainer}>
          <h3>Products</h3>
          {(data.products[selectedCategory] || []).map(
            (product) => (
              <div
                key={product._id}
                className={`${styles.draggableItem} ${
                  selectedItem?._id === product._id
                    ? styles.selectedItem
                    : ""
                }`}
                onClick={() => handleItemClick(product)}
              >
                {product.title}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default DragDropPanel;
