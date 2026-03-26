-- DuckDB Schema — Adoro Studios Analytics Layer

-- === PERFORMANCE METRICS ===
CREATE TABLE IF NOT EXISTS campaign_performance (
    id              BIGINT PRIMARY KEY,
    campaign_id    VARCHAR,
    company_id      VARCHAR,
    agent_id        VARCHAR,
    metric_date     DATE,
    impressions     BIGINT,
    clicks          BIGINT,
    ctr             DOUBLE,
    conversions     BIGINT,
    spend           DOUBLE,
    revenue         DOUBLE,
    roi             DOUBLE,
    engagement_rate DOUBLE,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- === SOCIAL POSTS ===
CREATE TABLE IF NOT EXISTS social_posts (
    id              BIGINT PRIMARY KEY,
    post_id         VARCHAR,
    company_id      VARCHAR,
    platform        VARCHAR,
    content         TEXT,
    posted_at       TIMESTAMP,
    impressions     BIGINT,
    likes           BIGINT,
    comments        BIGINT,
    shares          BIGINT,
    saves           BIGINT,
    reach           BIGINT,
    video_views     BIGINT,
    cta_clicks      BIGINT,
    hashtag         VARCHAR,
    content_type    VARCHAR,
    campaign_id     VARCHAR,
    engagement_rate DOUBLE,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- === CONTENT CALENDAR ===
CREATE TABLE IF NOT EXISTS content_calendar (
    id              BIGINT PRIMARY KEY,
    company_id      VARCHAR,
    planned_date    DATE,
    platform        VARCHAR,
    content_type    VARCHAR,
    topic           VARCHAR,
    description     TEXT,
    status          VARCHAR,
    assigned_to     VARCHAR,
    campaign_id     VARCHAR,
    actual_post_at  TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- === AGENT ACTIVITY LOG ===
CREATE TABLE IF NOT EXISTS agent_activity (
    id              BIGINT PRIMARY KEY,
    agent_id        VARCHAR,
    company_id      VARCHAR,
    action          VARCHAR,
    description     TEXT,
    tokens_used     BIGINT,
    duration_ms     BIGINT,
    cost_usd        DOUBLE,
    success         BOOLEAN,
    timestamp       TIMESTAMP DEFAULT NOW()
);

-- === A/B TEST RESULTS ===
CREATE TABLE IF NOT EXISTS ab_tests (
    id              BIGINT PRIMARY KEY,
    company_id      VARCHAR,
    test_name       VARCHAR,
    hypothesis      TEXT,
    variant_a       TEXT,
    variant_b       TEXT,
    metric          VARCHAR,
    result_a        DOUBLE,
    result_b        DOUBLE,
    winner          VARCHAR,
    confidence      DOUBLE,
    sample_size     BIGINT,
    started_at      TIMESTAMP,
    concluded_at    TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- === CLIENT/PROJECT TRACKING ===
CREATE TABLE IF NOT EXISTS projects (
    id              BIGINT PRIMARY KEY,
    company_id      VARCHAR,
    project_name    VARCHAR,
    client_name     VARCHAR,
    status          VARCHAR,
    start_date      DATE,
    end_date        DATE,
    budget          DOUBLE,
    spent           DOUBLE,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- === SKILL USAGE ===
CREATE TABLE IF NOT EXISTS skill_usage (
    id              BIGINT PRIMARY KEY,
    agent_id        VARCHAR,
    skill_name      VARCHAR,
    company_id      VARCHAR,
    task_id         VARCHAR,
    success         BOOLEAN,
    quality_score   DOUBLE,
    notes           TEXT,
    timestamp       TIMESTAMP DEFAULT NOW()
);

-- === QUARTERLY GOALS ===
CREATE TABLE IF NOT EXISTS quarterly_goals (
    id              BIGINT PRIMARY KEY,
    company_id      VARCHAR,
    goal_id         VARCHAR,
    description     TEXT,
    quarter         VARCHAR,
    status          VARCHAR,
    metrics         JSON,
    progress_pct    DOUBLE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Auto-increment sequences
CREATE SEQUENCE IF NOT EXISTS campaign_performance_seq;
CREATE SEQUENCE IF NOT EXISTS social_posts_seq;
CREATE SEQUENCE IF NOT EXISTS content_calendar_seq;
CREATE SEQUENCE IF NOT EXISTS agent_activity_seq;
CREATE SEQUENCE IF NOT EXISTS ab_tests_seq;
CREATE SEQUENCE IF NOT EXISTS projects_seq;
CREATE SEQUENCE IF NOT EXISTS skill_usage_seq;
CREATE SEQUENCE IF NOT EXISTS quarterly_goals_seq;

-- === VIEWS ===
CREATE OR REPLACE VIEW v_campaign_roi AS
SELECT 
    campaign_id,
    SUM(spend) as total_spend,
    SUM(revenue) as total_revenue,
    SUM(revenue) - SUM(spend) as profit,
    (SUM(revenue) - SUM(spend)) / NULLIF(SUM(spend), 0) as roi_pct
FROM campaign_performance
GROUP BY campaign_id;

CREATE OR REPLACE VIEW v_social_engagement_by_platform AS
SELECT 
    platform,
    COUNT(*) as total_posts,
    AVG(engagement_rate) as avg_engagement,
    SUM(impressions) as total_impressions,
    SUM(likes + comments + shares + saves) as total_interactions
FROM social_posts
GROUP BY platform;

CREATE OR REPLACE VIEW v_agent_cost_summary AS
SELECT
    agent_id,
    SUM(tokens_used) as total_tokens,
    SUM(cost_usd) as total_cost_usd,
    SUM(duration_ms) / 1000 / 60 as total_minutes,
    COUNT(*) as total_actions,
    AVG(CASE WHEN success THEN 1.0 ELSE 0.0 END) as success_rate
FROM agent_activity
GROUP BY agent_id;
