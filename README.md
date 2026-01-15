## 📂 Repository Structure

The codebase is structured to distinguish between concept learning and project implementation.

### 1. 🧪 Practice Folder
* **Location:** `[Tech]/Practice/Topic`
* **Purpose:** Daily experiments, syntax learning, and small drills.
* **Convention:** Numbered files (e.g., `1.intro.html`) mapped to corresponding numbered stylesheets in `assets/css/`.

### 2. 📝 Assignments Folder
* **Location:** `[Tech]/Assignments/`
* **Purpose:** Formal tasks and larger projects assigned by the mentor.
* **Convention:** Each assignment gets its own dedicated folder (e.g., `Task-Name/`) containing the HTML and its specific resources.

## 🌳 File Hierarchy
```text
VSS-CodeBase/
├── CSS/
│   ├── Practice/
│   │   └── Topic/
│   │       ├── 1.intro.html            # HTML File 1
│   │       ├── 2.forms.html            # HTML File 2
│   │       ├── 3.table.html            # HTML File 3
│   │       ├── 4.table.html            # HTML File 4
│   │       └── assets/
│   │           └── css/
│   │               ├── 2.style.css     # Styles specifically for File 2
│   │               └── 4.style.css     # Styles specifically for file 4
│   └── Assignments/
│       └── Task-Name/
│           ├── task.html            # HTML Task
│           └── assets/
│               └── css/
│                   └── style.css     # Styles specifically task
└── README.md
