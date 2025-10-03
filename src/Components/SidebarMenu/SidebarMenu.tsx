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
        {items.map((it) => (
          <SidebarItem key={it.id} item={it} level={0} onSelect={onSelect} />
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
  const subId = useId();

  const children = item.children && item.children.length ? item.children : null;
  const hasChildren = !!children;

  const handleItem = () => (hasChildren ? setOpen((v) => !v) : onSelect?.(item.id));

  const liClass = `${styles.item} ${styles[`level${level}`]}`;
  const arrowClass = `${styles.arrowBtn} ${open ? styles.open : ""}`;
  const subListClass = `${styles.subList} ${open ? styles.show : ""}`;

  return (
    <li className={liClass}>
      <div className={styles.itemRow}>
        <button
          className={styles.btn}
          onClick={handleItem}
          aria-expanded={hasChildren ? open : undefined}
          aria-controls={hasChildren ? subId : undefined}
        >
          {item.label}
        </button>

        {hasChildren && (
          <button
            type="button"
            className={arrowClass}
            aria-label={open ? "Згорнути" : "Розгорнути"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.chev}>▶</span>
          </button>
        )}
      </div>

      {hasChildren && (
        <ul id={subId} className={subListClass} role="group">
          {children!.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              level={level < 2 ? level + 1 : 2}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
