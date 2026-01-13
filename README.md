## 📂 Repository Structure

The codebase is structured to distinguish between concept learning and project implementation.

### 1. 🧪 Practice Folder
* **Location:** `[Topic]/Practice/`
* **Purpose:** Daily experiments, syntax learning, and small drills.
* **Convention:** Numbered files (e.g., `1.intro.html`) mapped to corresponding numbered stylesheets in `assets/css/`.

### 2. 📝 Assignments Folder
* **Location:** `[Topic]/Assignments/`
* **Purpose:** Formal tasks and larger projects assigned by the mentor.
* **Convention:** Each assignment gets its own dedicated folder (e.g., `Task-Name/`) containing the HTML and its specific resources.

## 🌳 File Hierarchy
```text
VSS-CodeBase/
├── CSS/
│   ├── Practice/
│   │   ├── 1.intro.html            # HTML Task 1
│   │   ├── 2.forms.html            # HTML Task 2
│   │   ├── 3.table.html            # HTML Task 3
│   │   ├── 4.table.html            # HTML Task 4
│   │   └── assets/
│   │       └── css/
│   │           ├── 2.style.css     # Styles specifically for Task 2
│   │           └── 4.style.css     # Styles specifically for Task 4
│   └── Assignments/
│       └── Task-Name/
│           ├── task.html            # HTML Task
│           └── assets/
│               └── css/
│                   └── style.css     # Styles specifically task
└── README.md
