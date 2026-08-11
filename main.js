const roadmapData = [
    {
        id: "01",
        title: "Import Data",
        icon: "fa-database",
        category: "Ingestion",
        desc: "Connecting and loading multi-source data.",
        items: ["CSV Files", "SQL Databases", "Folders (Batch files)"]
    },
    {
        id: "02",
        title: "Dashboard Visualizations",
        icon: "fa-chart-pie",
        category: "Visuals",
        desc: "Comprehensive standard and advanced visual charts.",
        items: [
            "Bar Charts (Columns / Clustered / Stacked / 100% Stacked)",
            "Line & Area Chart (+ Drill down concept)",
            "Line & Columns Charts",
            "Common Charts (Pie, Donut)",
            "Treemap & Scatter Plot",
            "Maps (Map, Filled Map, ArcGIS Maps)",
            "Uncommon Charts (Ribbon, Waterfall, Funnel)",
            "Table / Matrix + Conditional Formatting",
            "Sparklines",
            "Cards (Card, Gauge, Multi-row Card, KPI Card)"
        ]
    },
    {
        id: "03",
        title: "Edit Interactions",
        icon: "fa-arrows-split-up-and-left",
        category: "UX & Flow",
        desc: "Configuring cross-filtering behaviors between visuals.",
        items: ["Clicking one dashboard visual to filter other target visuals instead of highlighting."]
    },
    {
        id: "04",
        title: "Quick Measure",
        icon: "fa-bolt",
        category: "Calculations",
        desc: "Using built-in template formulas for rapid computation.",
        items: ["Pre-packaged Power Query and DAX calculations made easy without writing code from scratch."]
    },
    {
        id: "05",
        title: "Slicers & Controls",
        icon: "fa-filter",
        category: "Filtering",
        desc: "Interactive filtering tools for end-users.",
        items: ["Interactive Slicer filtering", "Syncing Slicers across multiple pages", "Clear Slicer Button functionality"]
    },
    {
        id: "06",
        title: "Buttons & Bookmarks",
        icon: "fa-bookmark",
        category: "Navigation",
        desc: "Saving report states and loadouts for interactive UI experiences.",
        items: ["Capturing specific state loadouts, filter selections, and view toggles via buttons."]
    },
    {
        id: "07",
        title: "Section Panes",
        icon: "fa-layer-group",
        category: "Organization",
        desc: "Managing layer orders, grouping, and visibility.",
        items: ["Selection Pane (Grouping elements, Hide/Show toggle states)"]
    },
    {
        id: "08",
        title: "Sketching / Wireframe",
        icon: "fa-pen-ruler",
        category: "Design",
        desc: "Laying out visual hierarchy and dashboard wireframes prior to building.",
        items: ["Pre-planning UI structure, component alignment, and user journey flow."]
    },
    {
        id: "09",
        title: "Drill Through",
        icon: "fa-magnifying-glass-chart",
        category: "Navigation",
        desc: "Dynamic detail pages triggered by specific data points.",
        items: ["Full-page view waiting for input context passed from selected data points on summary pages."]
    },
    {
        id: "10",
        title: "Git / GitHub Integration",
        icon: "fa-code-branch",
        category: "DevOps",
        desc: "Version control for professional Power BI projects (.pbip).",
        items: ["Tracking code changes, branching, and collaborating via GitHub repositories."]
    },
    {
        id: "11",
        title: "Power Query (ETL Basics)",
        icon: "fa-wand-magic-sparkles",
        category: "ETL",
        desc: "Foundational data preparation and cleanup workflow.",
        items: [
            "Data Profiling (Quality & distribution stats)",
            "Change Data Type",
            "Clean Text (Trim spaces, Replace values)",
            "Add Column & Rename Column",
            "Reference vs. Duplicate tables"
        ]
    },
    {
        id: "12",
        title: "View Model & Relationships",
        icon: "fa-network-wired",
        category: "Modeling",
        desc: "Structuring clean database schemas.",
        items: ["Star Schema concept, cardinality, and relationship filter directions."]
    },
    {
        id: "13",
        title: "Advanced Power Query",
        icon: "fa-gears",
        category: "ETL",
        desc: "Complex data transformation techniques.",
        items: [
            "Split tables (Reference then delete unwanted columns)",
            "Split Value by Delimiter into multiple columns",
            "Pivot (Wide table) / Unpivot (Long table melting)",
            "Conditional Column (If-Else logic)",
            "Append (Row union) vs. Merge (Column join)",
            "Group By aggregations",
            "Column by Example (Pattern-based smart formatting)",
            "Cluster Column (If-Else combined with mathematical operators)"
        ]
    },
    {
        id: "14",
        title: "DAX (Data Analysis Expressions)",
        icon: "fa-square-root-variable",
        category: "Formulas",
        desc: "Advanced calculation engine for business intelligence.",
        items: [
            "New Calculated Column (Row-by-row evaluation, stored in memory)",
            "New Table (Creating custom tables via formulas)",
            "Implicit Measures (Auto-aggregation) vs. Explicit Measures (Custom-defined)",
            "New Measure (Dynamic on-the-fly execution) vs. Calculated Column",
            "Parameters (Fields & Numeric parameters for dynamic control)"
        ]
    }
];

// LocalStorage for completion tracking
let completedTopics = JSON.parse(localStorage.getItem('pbi_completed')) || [];

const grid = document.getElementById('roadmapGrid');
const searchInput = document.getElementById('searchInput');
const filterContainer = document.getElementById('filterContainer');
let currentFilter = 'all';

function renderRoadmap(data) {
    if (data.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-20 text-slate-500">
                <i class="fa-regular fa-folder-open text-5xl mb-3"></i>
                <p class="text-sm">No matching topics found.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = data.map(section => {
        const isCompleted = completedTopics.includes(section.id);
        return `
            <div class="card-glass rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group hover:border-amber-500/40 relative overflow-hidden shadow-xl ${isCompleted ? 'border-amber-500/30 bg-amber-500/[0.02]' : ''}">
                
                <div>
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-[11px] font-bold px-3 py-1 bg-dark-900 text-amber-400 rounded-full border border-slate-800">
                            ${section.category}
                        </span>
                        <div class="flex items-center gap-3">
                            <span class="text-xs font-mono text-slate-500 font-semibold">#${section.id}</span>
                            <button onclick="toggleComplete('${section.id}')" title="Mark as completed" 
                                class="w-7 h-7 rounded-full flex items-center justify-center border transition-all ${isCompleted ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-dark-900 border-slate-700 text-slate-500 hover:border-amber-500 hover:text-amber-400'}">
                                <i class="fa-solid fa-check text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Title & Desc -->
                    <div class="flex items-center gap-3 mb-2">
                        <div class="text-amber-400 text-xl group-hover:scale-110 transition-transform duration-300">
                            <i class="fa-solid ${section.icon}"></i>
                        </div>
                        <h2 class="text-lg font-bold text-white tracking-tight">${section.title}</h2>
                    </div>
                    <p class="text-slate-400 text-xs mb-4 leading-relaxed">${section.desc}</p>

                    <!-- Items List -->
                    <ul class="space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                        ${section.items.map(item => `
                            <li class="flex items-start gap-2">
                                <span class="text-amber-500 mt-0.5">•</span>
                                <span class="leading-snug">${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }).join('');

    updateProgress();
}

function toggleComplete(id) {
    if (completedTopics.includes(id)) {
        completedTopics = completedTopics.filter(item => item !== id);
    } else {
        completedTopics.push(id);
    }
    localStorage.setItem('pbi_completed', JSON.stringify(completedTopics));
    filterAndRender();
}

function updateProgress() {
    const total = roadmapData.length;
    const completed = completedTopics.length;
    const percentage = (completed / total) * 100;
    
    document.getElementById('progressText').innerText = `${completed} / ${total} Completed`;
    document.getElementById('progressBar').style.width = `${percentage}%`;
}

function filterAndRender() {
    const term = searchInput.value.toLowerCase().trim();
    
    let filtered = roadmapData.filter(sec => {
        const matchesSearch = sec.title.toLowerCase().includes(term) ||
                              sec.category.toLowerCase().includes(term) ||
                              sec.desc.toLowerCase().includes(term) ||
                              sec.items.some(item => item.toLowerCase().includes(term));
                              
        const matchesCategory = currentFilter === 'all' || sec.category === currentFilter;
        
        return matchesSearch && matchesCategory;
    });

    renderRoadmap(filtered);
}

// Event Listeners
searchInput.addEventListener('input', filterAndRender);

filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-amber-500', 'text-slate-950', 'shadow-md');
            btn.classList.add('bg-dark-900', 'text-slate-400', 'border', 'border-slate-800');
        });
        e.target.classList.remove('bg-dark-900', 'text-slate-400', 'border', 'border-slate-800');
        e.target.classList.add('bg-amber-500', 'text-slate-950', 'shadow-md');
        
        currentFilter = e.target.getAttribute('data-filter');
        filterAndRender();
    }
});

// Initial Load
renderRoadmap(roadmapData);