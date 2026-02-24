"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Users, Settings, Edit, Trash2, Shield, User } from "lucide-react";
import { cn } from "@/lib/utils";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SYSTEM_STATS = [
    { label: "Total Courses", value: "7", color: "text-foreground" },
    { label: "In Progress", value: "2", color: "text-blue-600" },
    { label: "Requiring Action", value: "0", color: "text-red-500" },
];

const USER_STATS = [
    { label: "Total Users", value: "6", color: "text-foreground" },
    { label: "Administrators", value: "2", color: "text-blue-600" },
    { label: "Active Users", value: "4", color: "text-green-600" },
];

const COURSE_HEALTH = [
    { name: "React Fundamentals", slug: "react-fundamentals", status: "Completed", progress: 100 },
    { name: "Advanced Next.js Patterns", slug: "nextjs-advanced", status: "Completed", progress: 100 },
    { name: "TypeScript Mastery", slug: "typescript-master", status: "Completed", progress: 85 },
    { name: "Advanced CSS & Design Systems", slug: "css-advanced", status: "In Progress", progress: 65 },
    { name: "Web Performance Optimization", slug: "web-performance", status: "In Progress", progress: 50 },
    { name: "Testing Strategies & Best Practices", slug: "testing-strategies", status: "Pending", progress: 0 },
    { name: "WEB PERFORMANCE", slug: "web-performance-2", status: "Pending", progress: 0 },
];

const USER_DIRECTORY = [
    { name: "Alice Johnson", email: "alice@example.com", role: "ADMIN", status: "Active", lastLogin: "02/02/2024" },
    { name: "Bob Smith", email: "bob@example.com", role: "ADMIN", status: "Active", lastLogin: "01/02/2024" },
    { name: "Carol Williams", email: "carol@example.com", role: "USER", status: "Active", lastLogin: "02/02/2024" },
    { name: "David Brown", email: "david@example.com", role: "USER", status: "Active", lastLogin: "28/01/2024" },
    { name: "Emma Davis", email: "emma@example.com", role: "USER", status: "Inactive", lastLogin: "Never" },
    { name: "Frank Miller", email: "frank@example.com", role: "USER", status: "Suspended", lastLogin: "25/01/2024" },
];

import { toast } from "sonner";
import { PERSONA_LABELS, PERSONA_PERMISSIONS } from "@/constants/personas";

export default function AdminPage() {
    const [isAddUserOpen, setIsAddUserOpen] = React.useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = React.useState(false);
    const [isDeleteUserOpen, setIsDeleteUserOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<any>(null);

    const handleAction = (action: string) => {
        toast.success(`Action performed: ${action}`);
    };

    const handleDeleteUser = () => {
        toast.error(`User ${selectedUser?.name} has been removed.`);
        setIsDeleteUserOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight text-foreground uppercase tracking-widest">Admin Control</h1>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    System Monitoring & User Governance
                </p>
            </div>

            <Tabs defaultValue="health" className="w-full">
                <TabsList className="w-full h-12 bg-muted/20 p-1 mb-8 border border-border/50">
                    <TabsTrigger value="health" className="flex-1 py-2 font-bold uppercase text-xs tracking-widest transition-all">
                        <Activity className="mr-2 h-3 w-3" />
                        System Health
                    </TabsTrigger>
                    <TabsTrigger value="users" className="flex-1 py-2 font-bold uppercase text-xs tracking-widest transition-all">
                        <Users className="mr-2 h-3 w-3" />
                        User Management
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="health" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {SYSTEM_STATS.map(stat => (
                            <Card key={stat.label} className="border-border/50 bg-card/50 shadow-sm">
                                <CardContent className="p-6 space-y-2">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                    <p className={cn("text-3xl font-extrabold", stat.color)}>{stat.value}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="border-border/50 bg-card shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-border/50 bg-muted/10">
                            <h2 className="text-sm font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                                <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                                Course Status Overview
                            </h2>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30">
                                    <TableHead className="font-bold uppercase text-xs tracking-widest">Course</TableHead>
                                    <TableHead className="font-bold uppercase text-xs tracking-widest">Slug</TableHead>
                                    <TableHead className="font-bold uppercase text-xs tracking-widest">Status</TableHead>
                                    <TableHead className="font-bold uppercase text-xs tracking-widest">Progress</TableHead>
                                    <TableHead className="text-right font-bold uppercase text-xs tracking-widest">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {COURSE_HEALTH.map((course) => (
                                    <TableRow key={course.slug}>
                                        <TableCell className="font-bold">{course.name}</TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">{course.slug}</TableCell>
                                        <TableCell>
                                            <Badge variant={course.status === "Completed" ? "default" : course.status === "In Progress" ? "secondary" : "outline"} className="text-xs uppercase font-bold px-2 py-0 border-none">
                                                {course.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-muted-foreground">{course.progress}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 text-xs font-bold uppercase tracking-widest"
                                                onClick={() => handleAction(`Override ${course.name}`)}
                                            >
                                                Override
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="users" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {USER_STATS.map(stat => (
                            <Card key={stat.label} className="border-border/50 bg-card/50 shadow-sm">
                                <CardContent className="p-6 space-y-2">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                    <p className={cn("text-3xl font-extrabold", stat.color)}>{stat.value}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="border-border/50 bg-card shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-border/50 bg-muted/10 flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                                <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                                User Directory
                            </h2>
                            <Button
                                className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest px-6 shadow-xl shadow-blue-500/20"
                                onClick={() => setIsAddUserOpen(true)}
                            >
                                <Users className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30">
                                    <TableHead className="font-bold uppercase text-xs tracking-widest">User</TableHead>
                                    <TableHead className="font-bold uppercase text-xs tracking-widest">Email</TableHead>
                                    <TableHead className="font-bold uppercase text-xs tracking-widest">Role</TableHead>
                                    <TableHead className="font-bold uppercase text-xs tracking-widest">Status</TableHead>
                                    <TableHead className="font-bold uppercase text-xs tracking-widest">Last Login</TableHead>
                                    <TableHead className="text-right font-bold uppercase text-xs tracking-widest">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {USER_DIRECTORY.map((user) => (
                                    <TableRow key={user.email}>
                                        <TableCell className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full border border-blue-600 flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                            </div>
                                            <span className="font-bold">{user.name}</span>
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.role === "Admin" ? "default" : "secondary"} className="h-5 text-[11px] uppercase font-bold bg-blue-600 text-white border-none">
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn("h-5 text-[11px] uppercase font-bold border-none",
                                                user.status === "Active" ? "bg-green-100 text-green-700" :
                                                    user.status === "Suspended" ? "bg-red-100 text-red-700" : "bg-muted text-muted-foreground"
                                            )}>
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-xs font-medium text-muted-foreground">{user.lastLogin}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsEditUserOpen(true);
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive/70 hover:text-destructive"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsDeleteUserOpen(true);
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Add User Dialog */}
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold tracking-tight">Add New User</DialogTitle>
                        <DialogDescription className="text-sm font-medium">
                            Create a new user account and assign a role.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                            <Input id="name" placeholder="Enter name" className="h-10 bg-muted/20" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                            <Input id="email" type="email" placeholder="Enter email" className="h-10 bg-muted/20" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">System Role</Label>
                            <Select defaultValue="User">
                                <SelectTrigger className="h-10 bg-muted/20">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Administrator</SelectItem>
                                    <SelectItem value="User">Standard User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="h-10 font-bold uppercase text-xs tracking-widest">Cancel</Button>
                        <Button className="h-10 bg-blue-600 text-white font-bold uppercase text-xs tracking-widest" onClick={() => {
                            setIsAddUserOpen(false);
                            toast.success("User successfully added!");
                        }}>Create User</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold tracking-tight">Edit User Account</DialogTitle>
                        <DialogDescription className="text-sm font-medium">
                            Update details for {selectedUser?.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                            <Input id="edit-name" defaultValue={selectedUser?.name} className="h-10 bg-muted/20" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                            <Input id="edit-email" type="email" defaultValue={selectedUser?.email} className="h-10 bg-muted/20" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-role" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">System Role</Label>
                            <Select defaultValue={selectedUser?.role}>
                                <SelectTrigger className="h-10 bg-muted/20">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Administrator</SelectItem>
                                    <SelectItem value="User">Standard User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-status" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Account Status</Label>
                            <Select defaultValue={selectedUser?.status}>
                                <SelectTrigger className="h-10 bg-muted/20">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                    <SelectItem value="Suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditUserOpen(false)} className="h-10 font-bold uppercase text-xs tracking-widest">Cancel</Button>
                        <Button className="h-10 bg-blue-600 text-white font-bold uppercase text-xs tracking-widest" onClick={() => {
                            setIsEditUserOpen(false);
                            toast.success("User changes saved!");
                        }}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Dialog */}
            <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold tracking-tight text-destructive">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-sm font-medium">
                            Are you absolutely sure you want to delete <strong>{selectedUser?.name}</strong> ({selectedUser?.email})? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2">
                        <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)} className="h-10 flex-1 font-bold uppercase text-xs tracking-widest">Cancel</Button>
                        <Button
                            variant="destructive"
                            className="h-10 flex-1 font-bold uppercase text-xs tracking-widest"
                            onClick={handleDeleteUser}
                        >
                            Delete User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
