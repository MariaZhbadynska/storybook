import { useId, useState } from "react";
import styles from "./SidebarMenu.module.css";

export type MenuItem = {
  id: string;
  label: string;
  children?: MenuItem[];
};

type SidebarMenuProps = {
  items: MenuItem[];
  onSelect?: (id: string) => void;
};

export default function SidebarMenu({ items, onSelect }: SidebarMenuProps) {
  return (
    <nav className={styles.sidebar} aria-label="Sidebar">
      <ul className={styles.list}>
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} level={0} onSelect={onSelect} />
        ))}
      </ul>
    </nav>
  );
}

function SidebarItem({
  item,
  level,
  onSelect,
}: {
  item: MenuItem;
  level: number;
  onSelect?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!(item.children && item.children.length);
  const sublistId = useId();

  const toggle = () => setOpen((s) => !s);
  const handleClick = () => {
    if (hasChildren) toggle();
    else onSelect?.(item.id);
  };

  return (
    <li className={`${styles.item} ${styles[`level${level}`]}`}>
      <div className={styles.itemRow}>
        <button
          className={styles.btn}
          onClick={handleClick}
          aria-expanded={hasChildren ? open : undefined}
          aria-controls={hasChildren ? sublistId : undefined}
        >
          {item.label}
        </button>

        {hasChildren && (
          <button
            type="button"
            className={`${styles.arrowBtn} ${open ? styles.open : ""}`}
            aria-label={open ? "Згорнути" : "Розгорнути"}
            aria-expanded={open}
            aria-controls={sublistId}
            onClick={toggle}
          >
            <span className={styles.chev}>▶</span>
          </button>
        )}
      </div>

      {hasChildren && (
        <ul
          id={sublistId}
          className={`${styles.subList} ${open ? styles.show : ""}`}
          role="group"
        >
          {item.children!.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              level={Math.min(level + 1, 2)}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
