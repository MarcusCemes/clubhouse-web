<script lang="ts">
    import Link from "$lib/components/common/Link.svelte";
    import Paragraph from "$lib/components/common/Paragraph.svelte";
    import SubTitle from "$lib/components/common/SubTitle.svelte";
    import Title from "$lib/components/common/Title.svelte";
    import Column from "$lib/components/layout/Column.svelte";
    import Seo from "$lib/components/layout/Seo.svelte";
</script>

<Seo title="Frequently Asked Questions" />

<Column marginTop>
    <Title>Frequently Asked Questions</Title>

    <SubTitle>How do I close my account?</SubTitle>
    <Paragraph class="inline-flex">
        Get in touch with us at&nbsp;
        <Link href="mailto:contact@example.com" external>
            contact@example.com
        </Link>.
    </Paragraph>
</Column>
