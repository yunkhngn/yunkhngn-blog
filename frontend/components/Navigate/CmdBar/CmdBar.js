import { 
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarSearch,
    KBarResults,
    useMatches,
} from "kbar";
import React from 'react'

const searchLight = {
    padding: "12px 16px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    background: "#ffffff",
    color: "#171717",
    fontWeight: "bold",
  };

const animatorLight = {
    maxWidth: "600px",
    width: "100%",
    background: "#f1f1f1",
    color: "#171717",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 30px 60px rgb(0 0 0 / 12%)",
    border: "1px solid rgb(0, 0, 0, 0.1)",
};

const searchDark = {
    padding: "12px 16px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    background: "#1f1f1f",
    color: "white",
    fontWeight: "bold",
};

const animatorDark = {
    maxWidth: "600px",
    width: "100%",
    background: "#161616",
    color: "white",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid hsl(0 0% 100% / 0.077)",
};
  
const gruopNameStyle = {
padding: "8px 16px",
fontSize: "10px",
textTransform: "uppercase",
opacity: 0.5,
};

const portalLight = {
background: "white",
};

const portalDark = {
    background: "#161616",
};    

function RenderResults({theme}) {
const { results, rootActionId } = useMatches();

return (
    <KBarResults
    items={results}
    onRender={({ item, active }) =>
        typeof item === "string" ? (
        <div style={gruopNameStyle}>{item}</div>
        ) : (
        <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId}
            theme={theme}
        />
        )
    }
    />
);
}

const ResultItem = React.forwardRef(
    (
        {
        action,
        active,
        currentRootActionId,
        theme,
        }
        , ref
    ) => {
        const ancestors = React.useMemo(() => {
        if (!currentRootActionId) return action.ancestors;
        const index = action.ancestors.findIndex(
            (ancestor) => ancestor.id === currentRootActionId
        );
        return action.ancestors.slice(index + 1);
        }, [action.ancestors, currentRootActionId]);
        return (
        <div
            ref={ref}
            style={{
            padding: "12px 16px",
            background: active ? `${theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.3)'}` : "transparent",
            borderLeft: `2px solid ${
                active ? "#a8a7a5" : "transparent"
            }`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                fontSize: 14,
            }}
            >
            {action.icon && action.icon}
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                {ancestors.length > 0 &&
                    ancestors.map((ancestor) => (
                    <React.Fragment key={ancestor.id}>
                        <span
                        style={{
                            opacity: 0.5,
                            marginRight: 8,
                        }}
                        >
                        {ancestor.name}
                        </span>
                        <span
                        style={{
                            marginRight: 8,
                        }}
                        >
                        &rsaquo;
                        </span>
                    </React.Fragment>
                    ))}
                <span>{action.name}</span>
                </div>
                {action.subtitle && (
                <span style={{ fontSize: 12 }}>{action.subtitle}</span>
                )}
            </div>
            </div>
            {action.shortcut?.length ? (
            <div
                aria-hidden
                style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}
            >
                {action.shortcut.map((sc) => (
                <kbd
                    key={sc}
                    style={{
                    padding: "4px 6px",
                    background: "rgba(0 0 0 / .1)",
                    borderRadius: "4px",
                    fontSize: 14,
                    }}
                >
                    {sc}
                </kbd>
                ))}
            </div>
            ) : null}
        </div>
        );
    }
    );

const CommandBar = ({theme}) => {
    return (
        <KBarPortal>
        <KBarPositioner style={theme === 'light' ? portalLight : portalDark}>
            <KBarAnimator style={theme === 'light' ? animatorLight : animatorDark}>
            <KBarSearch style={theme === 'light' ? searchLight : searchDark}/>
            <RenderResults theme={theme}/>
            </KBarAnimator>
        </KBarPositioner>
        </KBarPortal>
    );
}

export default CommandBar;