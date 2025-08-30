import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { 
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Download,
  Upload,
  Link,
  History,
  Share,
  Archive,
  Lock,
  Unlock,
  Tag,
  FileText,
  Database,
  Eye,
  EyeOff,
  Star,
  StarOff,
  ExternalLink,
  QrCode,
  Calendar,
  Users,
  AlertTriangle
} from "lucide-react";

interface ObjectActionMenuProps {
  objectId: string;
  objectType: string;
  canEdit?: boolean;
  canDelete?: boolean;
  canManagePermissions?: boolean;
  isArchived?: boolean;
  isLocked?: boolean;
  isFavorite?: boolean;
  isVisible?: boolean;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onLock?: () => void;
  onUnlock?: () => void;
  onAddToFavorites?: () => void;
  onRemoveFromFavorites?: () => void;
  onShowHistory?: () => void;
  onManagePermissions?: () => void;
  onExportData?: () => void;
  onGenerateQR?: () => void;
  onScheduleTask?: () => void;
  onOpenNewTab?: () => void;
}

export function ObjectActionMenu({
  objectId,
  objectType,
  canEdit = true,
  canDelete = true,
  canManagePermissions = false,
  isArchived = false,
  isLocked = false,
  isFavorite = false,
  isVisible = true,
  onEdit,
  onDuplicate,
  onDelete,
  onArchive,
  onLock,
  onUnlock,
  onAddToFavorites,
  onRemoveFromFavorites,
  onShowHistory,
  onManagePermissions,
  onExportData,
  onGenerateQR,
  onScheduleTask,
  onOpenNewTab
}: ObjectActionMenuProps) {

  const handleAction = (action: (() => void) | undefined) => {
    if (action) {
      action();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Object Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* View Actions */}
        <DropdownMenuItem onClick={() => handleAction(onOpenNewTab)}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Open in New Tab
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction(onShowHistory)}>
          <History className="mr-2 h-4 w-4" />
          View History
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Edit Actions */}
        {canEdit && !isLocked && (
          <>
            <DropdownMenuItem onClick={() => handleAction(onEdit)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => handleAction(onDuplicate)}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
          </>
        )}
        
        {/* Favorites */}
        {isFavorite ? (
          <DropdownMenuItem onClick={() => handleAction(onRemoveFromFavorites)}>
            <StarOff className="mr-2 h-4 w-4" />
            Remove from Favorites
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => handleAction(onAddToFavorites)}>
            <Star className="mr-2 h-4 w-4" />
            Add to Favorites
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        {/* Data Management */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Database className="mr-2 h-4 w-4" />
            Data Management
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleAction(onExportData)}>
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Upload className="mr-2 h-4 w-4" />
              Import Data
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="mr-2 h-4 w-4" />
              Create Link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction(onGenerateQR)}>
              <QrCode className="mr-2 h-4 w-4" />
              Generate QR Code
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Collaboration */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Users className="mr-2 h-4 w-4" />
            Collaboration
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Share className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
            {canManagePermissions && (
              <DropdownMenuItem onClick={() => handleAction(onManagePermissions)}>
                <Users className="mr-2 h-4 w-4" />
                Manage Permissions
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Add Comment
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Tag className="mr-2 h-4 w-4" />
              Add Tags
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Workflow */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Calendar className="mr-2 h-4 w-4" />
            Workflow
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleAction(onScheduleTask)}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Task
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Create Alert
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSeparator />
        
        {/* Status Actions */}
        {isLocked ? (
          <DropdownMenuItem 
            onClick={() => handleAction(onUnlock)}
            disabled={!canEdit}
          >
            <Unlock className="mr-2 h-4 w-4" />
            Unlock
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem 
            onClick={() => handleAction(onLock)}
            disabled={!canEdit}
          >
            <Lock className="mr-2 h-4 w-4" />
            Lock
          </DropdownMenuItem>
        )}
        
        {isVisible ? (
          <DropdownMenuItem disabled={!canEdit}>
            <EyeOff className="mr-2 h-4 w-4" />
            Hide
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem disabled={!canEdit}>
            <Eye className="mr-2 h-4 w-4" />
            Show
          </DropdownMenuItem>
        )}
        
        {isArchived ? (
          <DropdownMenuItem 
            onClick={() => handleAction(onArchive)}
            disabled={!canEdit}
          >
            <Archive className="mr-2 h-4 w-4" />
            Unarchive
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem 
            onClick={() => handleAction(onArchive)}
            disabled={!canEdit}
          >
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>
        )}
        
        {/* Danger Zone */}
        {canDelete && !isLocked && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => handleAction(onDelete)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}