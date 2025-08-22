import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  Clock, 
  Calendar, 
  BarChart3, 
  Settings, 
  User,
  Menu,
  X,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Clock, label: "Mark Attendance", href: "/attendance" },
  { icon: Calendar, label: "Apply for Leave", href: "/leave" },
  { icon: User, label: "My Profile", href: "/profile" },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50",
      // Mobile: slide in/out based on isOpen, Desktop: always visible with collapse
      "lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      collapsed && "lg:w-16",
      !collapsed && "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-bold text-sidebar-foreground">
            <span className="text-sidebar-primary">GUC</span> Employee
          </h1>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </Button>
        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <X size={18} />
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-medium" 
                  : "text-sidebar-foreground"
              )}
            >
              <item.icon size={18} />
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-sidebar-accent rounded-lg p-3">
            <p className="text-sm text-sidebar-accent-foreground font-medium">
              Welcome back!
            </p>
            <p className="text-xs text-sidebar-foreground mt-1">
              Employee Portal
            </p>
          </div>
        </div>
      )}
    </div>
  );
}